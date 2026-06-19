import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaRegStar, FaCopy, FaRobot, FaEye, FaTag } from "react-icons/fa"; 
import Image from "next/image";

export default function EventCard({ event }) {
  if (!event) return null;

  const currentItem = event;

  // ইমেজ ভ্যালিডেশন চেক এবং ফলব্যাক ইউআরএল
  const hasValidImage = currentItem?.image && 
    typeof currentItem.image === 'string' && 
    (currentItem.image.startsWith("http://") || 
     currentItem.image.startsWith("https://") || 
     currentItem.image.startsWith("/"));

  const imageUrl = hasValidImage 
    ? currentItem.image 
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";

  // 💡 টিকিট প্রাইস সেফটি চেক
  const price = typeof currentItem?.ticketPrice === 'number' ? currentItem.ticketPrice : Number(currentItem?.ticketPrice) || 0;

  return (
    <Card
      className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-300 h-full flex flex-col p-0 overflow-hidden"
      radius="lg"
    >
      {/* ইমেজ সেকশন */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <Image
          src={imageUrl}
          alt={currentItem?.title || "AI Tool"}
          fill
          className="object-cover transform hover:scale-110 transition duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-pink-400 font-bold text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border border-pink-500/20 z-10">
          {currentItem?.category || "AI"}
        </span>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-6 flex-grow space-y-4">
        <h3 className="text-xl font-bold text-white hover:text-pink-500 transition-colors line-clamp-1">
          {currentItem?.title}
        </h3>
        
        <div className="space-y-2 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <FaRobot className="text-pink-500/80 w-4 h-4" />
            <span className="font-semibold text-slate-300">AI Tool:</span>
            <span>{currentItem?.aiTool || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-pink-500/80 font-semibold text-slate-300">Difficulty:</span>
            <span className="capitalize">{currentItem?.difficulty || "Beginner"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="text-pink-500/80 w-4 h-4" />
            <span className="font-semibold text-slate-300">Visibility:</span>
            <span className="capitalize">{currentItem?.visibility || "Public"}</span>
          </div>
        </div>
      </div>

      {/* ফুটার সেকশন (রেটিং, কপি কাউন্ট, প্রাইস এবং বাটন) */}
      <div className="px-6 pb-6 pt-4 flex justify-between items-center border-t border-white/5 mt-auto bg-slate-950/20">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
            <FaRegStar />
            <span>{typeof currentItem?.rating === 'number' ? currentItem.rating.toFixed(1) : "0.0"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <FaCopy />
            <span>{currentItem?.copyCount || 0} uses</span>
          </div>
          {/* 💡 নতুন সংযোজিত প্রাইস ট্যাগ */}
          <div className="flex items-center gap-1.5 text-pink-400 font-extrabold text-sm mt-0.5">
            <FaTag className="text-pink-500/70 text-xs" />
            <span>{price === 0 ? "Free" : `$${price.toFixed(2)}`}</span>
          </div>
        </div>

        <Link href={`/events/${currentItem?._id || currentItem?.id || ""}`}>
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-9 px-4 text-xs"
            disabled={!currentItem?._id && !currentItem?.id}
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}