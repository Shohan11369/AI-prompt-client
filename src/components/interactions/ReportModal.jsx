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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200 text-slate-950">
        <h3 className="text-xl font-bold mb-4">Report Prompt</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl"
        >
          <option>Spam</option>
          <option>Inappropriate Content</option>
          <option>Copyright Violation</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-3 mb-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={submitReport}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 rounded-xl text-white font-semibold transition"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

