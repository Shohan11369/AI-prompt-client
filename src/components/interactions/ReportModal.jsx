"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReportModal({ promptId, isOpen, onClose }) {
  const [reason, setReason] = useState("Spam");
  const [description, setDescription] = useState("");

  const submitReport = async () => {
    const res = await fetch(`/api/prompts/${promptId}/report`, {
      method: "POST",
      body: JSON.stringify({ reason, description }),
    });
    if (res.ok) {
      toast.success("Report submitted");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-lg shadow-xl w-full max-w-sm border border-slate-700 text-white">
        <h3 className="text-xl font-bold mb-4">Report Prompt</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 mb-4 bg-slate-800 text-white border border-slate-700 rounded"
        >
          <option>Spam</option>
          <option>Inappropriate Content</option>
          <option>Copyright Violation</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-2 mb-4 bg-slate-800 text-white border border-slate-700 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={submitReport}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
