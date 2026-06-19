"use client";

import { useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

export default function BookingWidget({
  ticketPrice,
  availableSeats,
  eventId,
  eventTitle,
}) {
  const [quantity, setQuantity] = useState(0);
  const { data: session } = useSession();
  const user = session?.user;

  const isSoldOut = availableSeats <= 0;


  const safePrice = typeof ticketPrice === 'number' ? ticketPrice : Number(ticketPrice) || 0;


  const totalAmount = (safePrice * quantity).toFixed(2);

  const handleBookTicket = async () => {
    const paymentData = {
      type: "booking",
      ticketPrice: safePrice.toFixed(2),
      eventId,
      eventTitle,
      quantity,
    };

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Card className="glass border-white/5 sticky top-24" radius="lg">
      {user?.role === "attendee" ? (
        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Booking Details</h3>

          {/* Stat list */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400"> Price:</span>
              <span className="text-pink-400 font-extrabold text-xl">
                {safePrice === 0 ? "Free" : `$${safePrice.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Available:</span>
              <span className="text-white font-bold">
                {isSoldOut ? (
                  <span className="text-red-500 uppercase">Sold Out</span>
                ) : (
                  `${availableSeats} Seats Left`
                )}
              </span>
            </div>
          </div>

          {!isSoldOut && (
            <>
              {/* Quantity selector */}
              <Input
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                label="Quantity"
                labelPlacement="outside"
                placeholder="1"
                min={1}
                max={availableSeats}
                className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />

              <div className="flex justify-between items-center text-sm font-semibold text-white pt-2">
                <span>Total Amount:</span>
                <span className="text-white text-lg">${totalAmount}</span>
              </div>
            </>
          )}

          <Button
            isDisabled={isSoldOut}
            onClick={handleBookTicket}
            className={`w-full font-bold h-12 shadow-lg ${
              isSoldOut
                ? "bg-slate-800 text-slate-500 shadow-none cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-pink-500/10 hover:shadow-pink-500/20"
            }`}
            radius="lg"
          >
            {isSoldOut ? "Sold Out" : "Book Ticket Now"}
          </Button>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 text-center justify-center pt-2">
            <FaCheck className="text-green-500 shrink-0" />
            <span>Instant confirmation | Vetted organizers</span>
          </div>
        </div>
      ) : (
        <Card className="p-6 bg-slate-900/50 border border-white/5">
          <p className="text-red-500 text-center font-medium">
            {user?.role ? user.role.toUpperCase() : "GUEST"} cannot book 
          </p>
        </Card>
      )}
    </Card>
  );
}