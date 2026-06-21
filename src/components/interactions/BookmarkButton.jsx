"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function BookmarkButton({ promptId }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/prompts/${promptId}/bookmark`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarked(data.bookmarked);
        setLoading(false);
      });
  }, [promptId]);

  const toggleBookmark = async () => {
    try {
      const res = await fetch(`/api/prompts/${promptId}/bookmark`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setBookmarked(data.bookmarked);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update bookmark");
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  if (loading) return <div className="p-2 animate-pulse">...</div>;

  return (
    <button onClick={toggleBookmark} className="p-2 transition-colors duration-200">
      {bookmarked ? (
        <FaHeart className="text-pink-500 scale-110" />
      ) : (
        <FaRegHeart className="text-slate-400 hover:text-pink-500" />
      )}
    </button>
  );
}
