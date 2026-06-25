"use client";

import { Card, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaEye, FaRobot, FaTag } from "react-icons/fa";

export default function TopOrganizers({ featuredOrgs }) {
  // ডাটা সেফটি চেক
  const items = Array.isArray(featuredOrgs) ? featuredOrgs : [];

  if (items.length === 0) {
    return (
      <section className="py-24 bg-slate-50 border-y border-slate-100 w-full text-center">
        <p className="text-slate-500 text-sm">No premium tools found at the moment.</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
            Featured AI Tools
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm mt-3">
            Explore state-of-the-art tools and premium workflows curated from your database.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.slice(0, 4).map((item) => {
            const title = item?.title || "AI Assistant";
            const imageUrl = item?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";
            const aiTool = item?.aiTool || "N/A";
            const category = item?.category || "AI";
            const price = typeof item?.ticketPrice === 'number' ? item.ticketPrice : Number(item?.ticketPrice) || 0;
            const rating = typeof item?.rating === 'number' ? item.rating.toFixed(1) : "0.0";

            return (
              <div key={item?._id || item?.id || Math.random()}>
                <Card
                  className="bg-white border border-slate-200 hover:border-brand-primary/30 transition-all duration-300 p-5 flex flex-col h-full gap-4 overflow-hidden"
                  radius="lg"
                >
                
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-white/80 backdrop-blur-md text-brand-primary font-bold text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border border-brand-primary/20">
                      {category}
                    </span>
                  </div>

                 
                  <div className="space-y-2 flex-grow text-left">
                    <h3 className="text-sm font-bold text-slate-950 line-clamp-1">
                      {title}
                    </h3>
                    <div className="space-y-1 text-slate-600 text-xs">
                      <div className="flex items-center gap-1.5">
                        <FaRobot className="text-brand-primary/80 w-3 h-3" />
                        <span>Tool: <span className="text-slate-800 font-medium">{aiTool}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaEye className="text-brand-primary/80 w-3 h-3" />
                        <span>Difficulty: <span className="text-slate-800 capitalize">{item?.difficulty || "Beginner"}</span></span>
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-auto">
                    <div className="text-left">
                      <div className="text-brand-primary font-extrabold text-xs flex items-center gap-1">
                        <FaTag className="text-[10px] text-brand-primary/60" />
                        <span>{price === 0 ? "Free" : `$${price.toFixed(2)}`}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mt-0.5">
                        <FaRegStar /> <span>{rating}</span>
                      </div>
                    </div>

                    <Link href={`/events/${item?._id || item?.id || ""}`}>
                      <Button
                        size="sm"
                        className="bg-brand-secondary hover:bg-cyan-700 text-white font-semibold h-7 px-3 text-[11px]"
                      >
                        Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
