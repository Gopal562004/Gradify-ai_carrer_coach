"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { checkAtsScoreFromText } from "@/actions/resume";
import { Button } from "@/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
//pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const CheckAtsScore = () => {
  const [score, setScore] = useState(null);
  const [logicScore, setLogicScore] = useState(null);
  const [aiScore, setAiScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async (file) => {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      fullText += strings.join(" ") + "\n";
    }

    return fullText;
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    toast.loading("Processing resume...", { id: "loading" });
    setLoading(true);

    try {
      const text = await extractTextFromPDF(file);
      const result = await checkAtsScoreFromText(text);

      setScore(result.score);
      setLogicScore(result.logicScore);
      setAiScore(result.aiScore);
      setMatchedKeywords(result.matchedKeywords || []);
      setSuggestions(result.suggestions || []);
      toast.success("ATS Score calculated", { id: "loading" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to process resume", { id: "loading" });
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="bg-black p-6 rounded-xl shadow-xl text-white space-y-6">
      <h2 className="text-2xl font-bold mb-2">
        📥 Upload Resume for ATS Score
      </h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 cursor-pointer text-center transition ${
          isDragActive ? "border-blue-400 bg-gray-800" : "border-gray-600"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-400">
          {isDragActive
            ? "Drop the resume here..."
            : "Drag & drop a PDF resume here, or click to select"}
        </p>
      </div>

      {loading && <p className="text-yellow-400">⏳ Analyzing resume...</p>}

      {score !== null && (
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            ✅ <span className="text-green-400">Final ATS Score:</span> {score}%
          </p>
          {logicScore !== null && aiScore !== null && (
            <p className="text-sm text-gray-400">
              (Keyword Score: {logicScore}%, AI Score: {aiScore}%)
            </p>
          )}

          {matchedKeywords.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-blue-400">
                🔍 Matched Keywords:
              </h3>
              <p className="text-sm text-gray-300">
                {matchedKeywords.join(", ")}
              </p>
            </div>
          )}

          {suggestions.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-pink-400">
                📌 AI Suggestions:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckAtsScore;
