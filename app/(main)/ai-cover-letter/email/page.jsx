"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserCoverLetters } from "@/actions/coverletter";
import { ArrowLeft } from "lucide-react";

export default function BulkEmailToHR() {
  const router = useRouter();
  const [emails, setEmails] = useState("");
  const [selectedLetterId, setSelectedLetterId] = useState("");
  const [coverLetters, setCoverLetters] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadLetters() {
      const data = await getUserCoverLetters();
      setCoverLetters(data);
    }
    loadLetters();
  }, []);

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    setCsvFile(file);

    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      const lines = text.split(/\r?\n/);
      const extractedEmails = lines
        .map((line) => line.trim())
        .filter((line) => /\S+@\S+\.\S+/.test(line));
      setEmails(extractedEmails.join(", "));
    };
    reader.readAsText(file);
  };

  const handleSend = async () => {
    if (!selectedLetterId || !emails) {
      alert("Please select a cover letter and enter at least one email.");
      return;
    }

    try {
      const res = await fetch("/api/send-bulk-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letterId: selectedLetterId, emails }),
      });

      if (res.ok) {
        setStatus("✅ Emails sent successfully!");
      } else {
        const error = await res.text();
        setStatus(`❌ Failed: ${error}`);
      }
    } catch (err) {
      setStatus("❌ Error sending emails.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Button Outside the Box */}
      <div className="max-w-3xl mx-auto mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-blue-400 text-sm hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto bg-black border border-zinc-700 rounded-lg shadow-lg p-6 sm:p-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            📤 Send Cover Letter to HRs
          </h1>
          <p className="text-gray-400 text-sm">
            Choose a letter and send to multiple HRs via CSV or pasted emails.
          </p>
        </div>

        {/* Select Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Select Cover Letter
          </label>
          <select
            value={selectedLetterId}
            onChange={(e) => setSelectedLetterId(e.target.value)}
            className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 "
          >
            <option value="">-- Choose a cover letter --</option>
            {coverLetters.map((letter) => (
              <option key={letter.id} value={letter.id}>
                {letter.jobTitle} @ {letter.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* CSV Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload CSV of HR Emails (optional)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            className="w-full bg-black text-gray-300 file:bg-white file:text-black file:px-4 file:py-2 file:rounded-md border border-zinc-700 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Each line should contain one email address.
          </p>
        </div>

        {/* Manual Emails */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Or Paste Emails (comma-separated)
          </label>
          <textarea
            placeholder="hr@example.com, recruiter@company.com"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 "
          />
        </div>

        {/* Send Button */}
        <div className="pt-2">
          <button
            onClick={handleSend}
            className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg shadow transition duration-300"
          >
            Send Emails
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <p className="text-sm text-center text-green-400 font-medium pt-4">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
