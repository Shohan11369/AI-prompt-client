"use client";
import { useState } from "react";
import BookmarkButton from "./BookmarkButton";
import CopyButton from "./CopyButton";
import ReviewSection from "./ReviewSection";
import ReportModal from "./ReportModal";
import TestimonialItem from "./TestimonialItem";

export default function PromptActions({ prompt }) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reviews, setReviews] = useState(prompt.reviews || []);

  return (
    <div className="space-y-6 border-t border-white/10 pt-6">
      <div className="flex items-center gap-4">
        <BookmarkButton promptId={prompt._id} />
        <CopyButton promptText={prompt.description} promptId={prompt._id} />
        <button onClick={() => setIsReportOpen(true)} className="text-sm text-slate-600 hover:text-red-600">
          Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.length > 0 ? (
            reviews.map((r) => <TestimonialItem key={r._id} review={r} />)
        ) : (
            <p className="text-slate-600 italic">No reviews yet.</p>
        )}
      </div>

      <ReviewSection promptId={prompt._id} initialReviews={reviews} />
      
      <ReportModal 
        promptId={prompt._id} 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />
    </div>
  );
}

