// app/(main)/ai-cover-letter/[id]/_components/EditorClient.jsx

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import { useEffect, useState } from "react";

export default function EditorClient({ initialContent, onSave }) {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] border border-gray-300 rounded-md p-4 focus:outline-none",
      },
      immediatelyRender: false, // ✅ Prevent SSR hydration error
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div>
      <EditorContent editor={editor} />
      <button
        onClick={() => onSave(content)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
}
