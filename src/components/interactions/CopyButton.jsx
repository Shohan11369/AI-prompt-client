"use client";
import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

export default function CopyButton({ promptText, promptId }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      await fetch(`/api/prompts/${promptId}/copy`, { method: "POST" });
      toast.success("Prompt copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-brand-text rounded hover:bg-slate-300 transition">
      <FaCopy /> Copy
    </button>
  );
}

