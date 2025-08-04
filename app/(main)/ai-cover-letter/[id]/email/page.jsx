"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCoverLetter } from "@/actions/coverletter";
import { ArrowLeft } from "lucide-react";

export default function SendEmailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [coverLetter, setCoverLetter] = useState(null);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function fetchLetter() {
      const data = await getCoverLetter(id);
      setCoverLetter(data);
      setSubject(`Application for ${data.jobTitle} at ${data.companyName}`);
      setMessage(data.content);
    }
    fetchLetter();
  }, [id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!to || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("sending");
    await new Promise((res) => setTimeout(res, 1500)); // Simulated delay
    setStatus("sent");
    setTo("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  if (!coverLetter) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-gray-400">
        Loading cover letter...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-1 text-blue-400 text-sm hover:underline focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-2xl mx-auto bg-black border border-zinc-700 rounded-lg shadow-lg p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            📧 Send Cover Letter via Email
          </h2>
          <p className="text-gray-400 text-sm">
            You're sending an email for the position of{" "}
            <span className="font-semibold">{coverLetter.jobTitle}</span> at{" "}
            <span className="font-semibold">{coverLetter.companyName}</span>.
          </p>
        </div>

        <form onSubmit={handleSend} className="space-y-5">
          {/* To */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">To</label>
            <input
              type="email"
              placeholder="hr@example.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-1"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-1"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 min-h-[200px] resize-y placeholder-gray-500 focus:outline-none focus:ring-1"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-white hover:bg-green-700 text-black font-semibold py-3 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send Email"}
          </button>

          {/* Status */}
          {status === "sent" && (
            <p className="text-green-500 text-sm mt-2 text-center">
              ✅ Email sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
