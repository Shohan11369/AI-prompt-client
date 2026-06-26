import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import EventCard from "./EventCard"; 
import { fetchFeaturedEvents } from "@/lib/api/events/data"; 

export default async function FeaturedEvents() {
  let events = [];
  
  try {
    const featuredEvents = await fetchFeaturedEvents();
 
    events = featuredEvents && featuredEvents.length > 0 ? featuredEvents : [];
  } catch (error) {
    console.error("Failed to fetch featured prompts:", error);
    events = []; 
  }

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="flex flex-col md:flex-row md:item-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Featured Prompts</h2>
          <p className="text-slate-600 text-sm mt-2">Explore the most powerful and effective AI prompts available right now.</p>
        </div>
        <Link href="/events" className="text-pink-500 hover:text-pink-400 font-semibold p-0 flex items-center gap-2 transition-colors">
          View All Prompts <FaChevronRight size={12} />
        </Link>
      </div>

 
      {events.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <p className="text-slate-500 text-sm">No featured prompts available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event?._id?.toString() || Math.random()}>
              <EventCard event={event} buttonText="Get Prompt" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}