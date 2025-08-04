"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { demandLevel, marketOutlook } from "@prisma/client";

// -------------------- Setup --------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// -------------------- Types --------------------
type DemandLevelText = "High" | "Medium" | "Low";
type MarketOutlookText = "Positive" | "Neutral" | "Negative";

interface SalaryRange {
  role: string;
  min: number;
  max: number;
  median: number;
  location: string;
}

interface AIInsightResult {
  salaryRanges: SalaryRange[];
  growthRate: number;
  demandLevel: DemandLevelText;
  topSkills: string[];
  marketOutlook: MarketOutlookText;
  keyTrends: string[];
  recommendedSkills: string[];
}

// -------------------- AI Generator --------------------
export const generateAIInsights = async (
  industry: string
): Promise<AIInsightResult> => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "High" | "Medium" | "Low",
      "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "marketOutlook": "Positive" | "Neutral" | "Negative",
      "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
      "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"]
    }

    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    
  `;

  const result = await model.generateContent(prompt);
  const rawText = await result.response.text();
  const cleaned = rawText.replace(/```(?:json)?/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ JSON parsing error:", err);
    throw new Error("Failed to parse Gemini AI response.");
  }
};

// -------------------- Enum Mappers --------------------
function mapDemandLevel(level: DemandLevelText): demandLevel {
  switch (level.toUpperCase()) {
    case "HIGH":
      return "HIGH";
    case "MEDIUM":
      return "MEDIUM";
    case "LOW":
      return "LOW";
    default:
      return "MEDIUM";
  }
}

function mapMarketOutlook(outlook: MarketOutlookText): marketOutlook {
  switch (outlook.toUpperCase()) {
    case "POSITIVE":
      return "POSITIVE";
    case "NEUTRAL":
      return "STABLE"; // Mapping "Neutral" to "STABLE"
    case "NEGATIVE":
      return "NEGATIVE";
    default:
      return "STABLE";
  }
}

// -------------------- Main Function --------------------
export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { IndustryInsight: true },
  });

  if (!user) throw new Error("User not found");
  if (!user.industry) throw new Error("User has not selected an industry");

  console.log("🤖 Generating new insight for:", user.industry);
  const aiInsight = await generateAIInsights(user.industry);

  const updateData = {
    industry: user.industry,
    salaryRanges: JSON.parse(JSON.stringify(aiInsight.salaryRanges)),
    growthRate: aiInsight.growthRate,
    demandLevel: mapDemandLevel(aiInsight.demandLevel),
    marketOutlook: mapMarketOutlook(aiInsight.marketOutlook),
    topSkills: aiInsight.topSkills,
    keyTrends: aiInsight.keyTrends,
    recommendedSkills: aiInsight.recommendedSkills,
    lastUpdated: new Date(),
    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };

  let result;
  if (user.IndustryInsight) {
    // If exists, update it
    result = await db.industryInsight.update({
      where: { id: user.IndustryInsight.id },
      data: updateData,
    });
    console.log("🔄 Insight updated in DB:", result.id);
  } else {
    // If not exists, create it
    result = await db.industryInsight.create({ data: updateData });
    console.log("✅ New insight saved to DB:", result.id);
  }

  return result;
}
