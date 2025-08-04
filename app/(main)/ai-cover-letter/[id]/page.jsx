"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCoverLetter, updateCoverLetter } from "@/actions/coverletter";
import { ArrowLeft } from "lucide-react";

export default function ViewCoverLetter() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function fetchData() {
      const data = await getCoverLetter(id);
      setTitle(data.title || "");
      setTags(data.tags || "");
      setContent(data.content || "");
    }
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    setStatus("saving");
    await updateCoverLetter({ id, title, tags, content });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-1 text-blue-500 text-sm hover:underline focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-3xl mx-auto bg-black border border-zinc-700 rounded-lg p-6 sm:p-10 shadow space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            ✍️ Edit Cover Letter
          </h1>
          <p className="text-gray-400 text-sm">
            Make changes to your AI-generated cover letter
          </p>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your cover letter"
            className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-1"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. frontend, internship, react"
            className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-1"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your cover letter content here..."
            className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 min-h-[300px] resize-y placeholder-gray-500 focus:outline-none focus:ring-1"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleUpdate}
            className="bg-white  text-black px-6 py-2 rounded-md transition shadow"
          >
            Save Changes
          </button>
          <p className="text-sm text-gray-400">
            {status === "saving" && "Saving..."}
            {status === "saved" && "✔️ Saved!"}
          </p>
        </div>
      </div>
    </div>
  );
}
