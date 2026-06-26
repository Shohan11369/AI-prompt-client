import Link from "next/link";
import {
    Card,
    Button
} from "@heroui/react";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { baseURL } from "@/lib/api/baseUrl";
import BookingWidget from "@/components/BookingWidget";

const fetchEvent = async (id) => {
    
    const res = await fetch(`${baseURL}/api/single-events/${id}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}

export default async function EventDetailsPage({ params }) {
    const { id } = await params;
    const event = await fetchEvent(id);

  
    const eventImageUrl = event?.image && typeof event.image === 'string' && event.image.trim() !== ""
        ? event.image
        : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";

    return (
        <div className="min-h-screen py-16 px-6 max-w-6xl mx-auto w-full space-y-12">
            {/* Back Button */}
            <Link href="/events">
                <Button
                    variant="light"
                    className="text-slate-500 hover:text-slate-900"
                    startContent={<FaArrowLeft />}
                >
                    Back to Browse
                </Button>
            </Link>

            {/* Banner */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                    src={eventImageUrl}
                    alt={event?.title || "Event Banner"}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-1" />

                <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-brand-primary font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-brand-primary/20 shadow-lg z-10">
                    {event?.category || "AI Tool"}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Details & Description */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                            {event?.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-brand-primary" />
                                <span>
                                    Difficulty: <span className="capitalize font-semibold text-brand-primary">{event?.difficulty || "Beginner"}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-brand-primary" />
                                <span>
                                    AI Tool: <span className="font-semibold text-brand-secondary">{event?.aiTool || "N/A"}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-950">Prompts Description</h2>
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                            {event?.description || "Master this AI tool with our comprehensive workflow. Learn implementation guidelines, best prompts, and optimization techniques for your day-to-day productivity."}
                        </p>
                    </div>

                    {/* New Interaction Features Section */}
                    <div className="mt-8">
                        {(() => {
                            const PromptActions = require("@/components/interactions/PromptActions").default;
                            return <PromptActions prompt={event} />;
                        })()}
                    </div>

                    {/* Organizer Info */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-950">Visibility- <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-semibold uppercase tracking-wider">{event?.visibility || "Public"}</span> </h2>
                    </div>
                </div>

                {/* Right Column: Ticket Booking Widget */}
                <div className="space-y-6">
                   <BookingWidget 
    ticketPrice={event?.ticketPrice} 
    price={event?.ticketPrice} 
    availableSeats={event?.availableSeats} 
    eventId={event?._id} 
    eventTitle={event?.title} 
/>
                </div>
            </div>
        </div>
    );
}