"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateResumeFromInput(input) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  // 🔍 Get internal user ID using clerkUserId
  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("No user found in database for Clerk user ID.");
  }

  const prompt = `
You're a resume writer. Generate a resume in JSON format:

{
  "summary": "Professional summary...",
  "skills": ["skill1", ...],
  "experience": ["exp line 1", ...],
  "education": ["edu 1", ...],
  "projects": ["project 1", ...]
}

User Info:
- Role: ${input.role}
- Skills: ${input.skills.join(", ")}
- Experience: ${input.experience}
- Education: ${input.education}

IMPORTANT: Return ONLY the valid JSON string. No extra commentary.
`;

  const result = await model.generateContent(prompt);
  const rawText = result.response
    .text()
    .replace(/```(?:json)?/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    console.error(
      "❌ Error parsing JSON from Gemini:",
      err,
      "\nText:",
      rawText
    );
    throw new Error("Gemini returned invalid JSON.");
  }

  const content = JSON.stringify(parsed, null, 2);

  // Save resume
  const existing = await db.resume.findUnique({
    where: { userId: user.id },
  });

  const resume = existing
    ? await db.resume.update({
        where: { userId: user.id },
        data: { content },
      })
    : await db.resume.create({
        data: {
          userId: user.id,
          content,
        },
      });

  return resume;
}

export async function getUserResume() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  // First, find the user in your DB using Clerk ID
  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("No user found for this Clerk ID.");
  }

  // Now fetch the resume using internal user ID
  const resume = await db.resume.findUnique({
    where: { userId: user.id },
  });

  if (!resume) {
    throw new Error("No resume found for this user.");
  }

  return JSON.parse(resume.content);
}

// Dummy keywords — you can load real ones per role or industry
// Define weighted job keywords

const JOB_KEYWORDS = [
  { term: "JavaScript", weight: 5 },
  { term: "React", weight: 5 },
  { term: "Node.js", weight: 4 },
  { term: "MongoDB", weight: 3 },
  { term: "REST", weight: 3 },
  { term: "TypeScript", weight: 4 },
  { term: "Git", weight: 2 },
  { term: "HTML", weight: 1 },
  { term: "CSS", weight: 1 },
  { term: "Agile", weight: 2 },
];

export async function checkAtsScoreFromText(text) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const lowerText = text.toLowerCase();
  let totalWeight = 0;
  let matchedWeight = 0;
  const matchedKeywords = [];

  for (const { term, weight } of JOB_KEYWORDS) {
    totalWeight += weight;
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, "g");
    const matches = lowerText.match(regex);
    if (matches && matches.length > 0) {
      matchedWeight += weight;
      matchedKeywords.push(term);
    }
  }

  const logicScore = Math.round((matchedWeight / totalWeight) * 100);

  // AI Evaluation
  const aiPrompt = `
You are an ATS (Applicant Tracking System) simulator. Evaluate the following resume text and give:
1. An overall ATS score (0-100)
2. At least 3 improvement suggestions to increase match for tech jobs.

Resume:
"""
${text}
"""
Return your answer in this format:

{
  "aiScore": number,
  "suggestions": ["string", "string", "string"]
}
`;

  let aiScore = null;
  let suggestions = [];

  try {
    const result = await model.generateContent(aiPrompt);
    const rawText = result.response
      .text()
      .replace(/```(json)?/g, "")
      .trim();
    const aiOutput = JSON.parse(rawText);
    aiScore = aiOutput.aiScore;
    suggestions = aiOutput.suggestions || [];
  } catch (err) {
    console.error("❌ AI scoring failed:", err);
  }

  const finalScore = aiScore ?? logicScore;

  // Save ATS result to database
  await db.resume.updateMany({
    where: { userId },
    data: {
      atsScore: finalScore,
      feedback: suggestions.join(" • "),
    },
  });

  return {
    score: finalScore,
    matchedKeywords,
    suggestions,
    logicScore,
    aiScore,
  };
}