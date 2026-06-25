import { Suspense } from "react";
import { Card } from "@heroui/react";
import FilterPanel from "@/components/FilterPanel";
import EventCard from "@/components/EventCard";
import { fetchEvents } from "@/lib/api/events/data";

export default async function BrowseEventsPage({ searchParams }) {
  const sParams = await searchParams;
  const search = sParams.search || "";
  const category = sParams.category || "";
  const location = sParams.location || "";

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (location) params.set("location", location);


  const eventsData = await fetchEvents(params.toString());


  const events = Array.isArray(eventsData) ? eventsData : [];

  return (
    <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto w-full space-y-12">
      {/* HEADER */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">
          Browse Premium AI Prompts
        </h1>
        <p className="text-slate-600 text-sm max-w-xl">
         Explore trending AI prompts and unlock endless creativity with instant access.
        </p>
      </div>

      {/* Interactive client-side filters wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="h-28 w-full bg-slate-50 animate-pulse rounded-2xl border border-slate-200" />
        }
      >
        <FilterPanel />
      </Suspense>

      {/* Server component events list wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="bg-white border border-slate-200 p-4 space-y-4 animate-pulse"
                >
                  <div className="h-48 rounded-xl bg-slate-100" />
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 w-3/5 rounded-lg" />
                    <div className="h-6 bg-slate-200 w-4/5 rounded-lg" />
                    <div className="h-4 bg-slate-200 w-2/5 rounded-lg" />
                  </div>
                </Card>
              ))}
          </div>
        }
      >
      
        {events.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-300 rounded-3xl bg-slate-50">
            <p className="text-slate-700 font-medium">
              No results found matching your criteria.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Try resetting the filters or changing your keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event?._id?.toString() || Math.random()}
                event={event}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}

