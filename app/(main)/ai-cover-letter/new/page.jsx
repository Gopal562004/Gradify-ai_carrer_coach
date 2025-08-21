"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateCoverLetter } from "@/actions/coverletter";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function NewCoverLetterPage() {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Wrap async call with toast.promise
      const result = await toast.promise(generateCoverLetter(form), {
        loading: "✨ Generating your cover letter...",
        success: "✅ Cover letter generated!",
        error: "❌ Something went wrong. Please try again.",
      });

      router.push(`/ai-cover-letter/${result.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 sm:px-6 lg:px-8 relative">

      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-1 text-sm text-blue-500 hover:underline focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-black border border-zinc-700 rounded-lg shadow-lg p-6 sm:p-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            ✨ Create a New Cover Letter
          </h1>
          <p className="text-gray-400 text-sm">
            Fill in the details below and let AI help you craft a personalized
            cover letter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Software Engineer"
              className="w-full rounded-lg bg-black border border-zinc-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Google"
              className="w-full rounded-lg bg-black border border-zinc-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Description
            </label>
            <textarea
              required
              placeholder="Paste the job description here..."
              className="w-full rounded-lg bg-black border border-zinc-700 px-4 py-3 text-white h-40 resize-none placeholder-gray-500 focus:outline-none focus:ring-1 transition"
              value={form.jobDescription}
              onChange={(e) =>
                setForm({ ...form, jobDescription: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out ${
                loading
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                  <span>Generating...</span>
                </span>
              ) : (
                "🚀 Generate Cover Letter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
