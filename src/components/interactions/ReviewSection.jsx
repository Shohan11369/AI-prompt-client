"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReviewSection({ promptId, initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/prompts/${promptId}/review`, {
      method: "POST",
      body: JSON.stringify({ rating, comment }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (res.ok) {
      const newReview = {
        _id: Date.now().toString(),
        name: "You (Just now)",
        email: "Pending...",
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };
      setReviews([newReview, ...reviews]);
      toast.success("Review added");
      setComment("");
    } else {
      toast.error("Failed to add review");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4">Submit a Review</h3>
      <form onSubmit={submitReview} className="bg-slate-900 p-4 rounded-lg space-y-3">
        <input 
            type="number" min="1" max="5" value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="bg-slate-800 p-2 rounded w-full text-white"
        />
        <textarea 
            value={comment} onChange={(e) => setComment(e.target.value)} 
            placeholder="Write a review..."
            className="bg-slate-800 p-2 rounded w-full text-white h-24"
        />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">Submit Review</button>
      </form>
      
      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="border-b border-white/10 py-4">
            <p className="text-white font-semibold">{r.name} - {r.rating} stars</p>
            <p className="text-slate-300">{r.comment}</p>
            <p className="text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
