import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaCopy, FaRobot, FaUser } from "react-icons/fa"; 
import Image from "next/image";

export default function EventCard({ event }) {
  if (!event) return null;

  const currentItem = event;

  const hasValidImage = currentItem?.image && 
    typeof currentItem.image === 'string' && 
    (currentItem.image.startsWith("http://") || 
     currentItem.image.startsWith("https://") || 
     currentItem.image.startsWith("/"));

  const imageUrl = hasValidImage 
    ? currentItem.image 
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";

  return (
    <Card
      className="bg-white border border-slate-200 hover:border-brand-primary/30 transition-all duration-300 h-full flex flex-col p-0 overflow-hidden"
      radius="lg"
    >
    
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
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

      <div className="p-6 flex-grow space-y-4">
        <h3 className="text-xl font-bold text-slate-950 hover:text-brand-primary transition-colors line-clamp-1">
          {currentItem?.title}
        </h3>
        
        <div className="space-y-2 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <FaRobot className="text-brand-primary/80 w-4 h-4" />
            <span className="font-semibold text-slate-800">AI Tool:</span>
            <span>{currentItem?.aiTool || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCopy className="text-brand-primary/80 w-4 h-4" />
            <span className="font-semibold text-slate-800">Copy Count:</span>
            <span>{currentItem?.copyCount || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="text-brand-primary/80 w-4 h-4" />
            <span className="font-semibold text-slate-800">Price:</span>
            <span>{currentItem?.ticketPrice ? `$${currentItem.ticketPrice}` : "Free"}</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-slate-100 mt-auto bg-slate-50">
        <Link href={`/events/${currentItem?._id || currentItem?.id || ""}`}>
          <Button
            size="sm"
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold h-9"
            disabled={!currentItem?._id && !currentItem?.id}
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}