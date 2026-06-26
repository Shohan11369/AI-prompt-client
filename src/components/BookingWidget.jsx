"use client";

import { useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";


export default function BookingWidget({
  ticketPrice,
  price, 
  availableSeats,
  eventId,
  eventTitle,
}) {
  const [quantity, setQuantity] = useState(0);
  const { data: session } = useSession();
  const user = session?.user;

  const isSoldOut = availableSeats <= 0;

  const finalPrice = ticketPrice !== undefined ? ticketPrice : price;
  const safePrice = typeof finalPrice === 'number' ? finalPrice : Number(finalPrice) || 0;

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
    <Card className="bg-white border border-slate-200 shadow-xl sticky top-24" radius="lg">
      {user?.role === "attendee" ? (
        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-950">Buy Details</h3>

          {/* Stat list */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600"> Price:</span>
              <span className="text-brand-primary font-extrabold text-xl">
                {safePrice === 0 ? "Free" : `$${safePrice.toFixed(2)}`}
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
                className="bg-slate-50 border border-slate-200 text-black rounded-xl hover:border-brand-primary focus-within:!border-brand-primary"
              />

              <div className="flex justify-between items-center text-sm font-semibold text-slate-900 pt-2">
                <span>Total Amount:</span>
                <span className="text-slate-950 text-lg">${totalAmount}</span>
              </div>
            </>
          )}

          <Button
            isDisabled={isSoldOut}
            onClick={handleBookTicket}
            className={`w-full font-bold h-12 ${
              isSoldOut
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-brand-primary text-white hover:bg-brand-primary/90"
            }`}
            radius="lg"
          >
            {isSoldOut ? "Sold Out" : "Purchase Now"}
          </Button>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 text-center justify-center pt-2">
            <FaCheck className="text-green-500 shrink-0" />
            <span>Instant confirmation | Vetted creators</span>
          </div>
        </div>
      ) : (
        <Card className="p-6 bg-slate-50 border border-slate-200">
          <p className="text-red-600 text-center font-medium">
            {user?.role ? user.role.toUpperCase() : "Without Login"} cannot buy
          </p>
        </Card>
      )}
    </Card>
  );
}