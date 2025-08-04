"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserCoverLetters, deleteCoverLetter } from "@/actions/coverletter";

export default function CoverLetterDashboard() {
  const [letters, setLetters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchLetters() {
      const result = await getUserCoverLetters();
      setLetters(result);
    }
    fetchLetters();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cover letter?"
    );
    if (!confirmDelete) return;

    await deleteCoverLetter(id);
    setLetters((prev) => prev.filter((letter) => letter.id !== id));
  };

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-6">
      {/* ✅ Fixed Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 text-sm hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Title and New Letter Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Your Cover Letters</h1>
          <Link href="/ai-cover-letter/new">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium">
              + New Cover Letter
            </button>
          </Link>
        </div>

        {/* Letter List or Empty State */}
        {letters.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No cover letters found. Start by creating one.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {letters.map((letter) => (
              <li
                key={letter.id}
                className="relative border border-gray-700 p-5 rounded-lg bg-black transition hover:shadow-lg"
              >
                {/* 🗑️ Delete button */}
                <button
                  onClick={() => handleDelete(letter.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
                  title="Delete"
                >
                  🗑️
                </button>

                <h2 className="text-xl font-semibold text-white">
                  {letter.jobTitle}
                </h2>
                <p className="text-gray-300">Company: {letter.companyName}</p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(letter.createdAt).toLocaleString()}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/ai-cover-letter/${letter.id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      ✏️ View / Edit
                    </button>
                  </Link>
                  <Link href={`/ai-cover-letter/${letter.id}/email`}>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      📧 Send Email
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Bulk Email Section */}
        <div className="mt-16 border-t border-gray-700 pt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            📤 Send to Multiple HRs
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            Want to reach out to multiple recruiters at once? Use our bulk email
            tool.
          </p>
          <Link href="/ai-cover-letter/email">
            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 text-sm font-medium">
              Open Bulk Email Sender
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
