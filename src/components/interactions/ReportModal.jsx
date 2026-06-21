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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3>Report Prompt</h3>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option>Spam</option>
          <option>Inappropriate Content</option>
          <option>Copyright Violation</option>
        </select>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" />
        <button onClick={submitReport}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
