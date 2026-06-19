
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import EventCard from "./EventCard";
import { fetchFeaturedEvents } from "@/lib/api/events/data";




export default async function FeaturedEvents() {
  const featuredEvents = await fetchFeaturedEvents()
  const events = featuredEvents && featuredEvents.length > 0 ? featuredEvents : [];
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Featured Events</h2>
          <p className="text-slate-400 text-sm mt-2">Explore the hottest and most popular events happening this week.</p>
        </div>
        <Link href="/events" className="text-pink-500 hover:text-pink-400 font-semibold p-0 flex items-center gap-2 transition-colors">
          View All Events <FaChevronRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event._id}>
            <EventCard event={event} buttonText="Book Ticket" />
          </div>
        ))}
      </div>
    </section>
  );
}
