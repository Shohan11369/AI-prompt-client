"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Textarea, Button, Form } from "@heroui/react";
import { FaDollarSign, FaTicketAlt, FaCalendarDay } from "react-icons/fa";

export default function AttendeeOverviewItems({ initialUser, statsData }) {
  // 💡 ডাইনামিক স্টেটস
  const [formData, setFormData] = useState({
    name: initialUser?.name || "",
    avatar: initialUser?.avatar || "",
    bio: initialUser?.bio || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডেলার
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // প্রোফাইল সাবমিট করার ফাংশন (API ইন্টিগ্রেশন)
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 📝 আপনার ব্যাকএন্ড প্রোফাইল আপডেট API এর সাথে কানেক্ট করুন
      const res = await fetch("/api/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profile updated successfully! 🎉");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ডাইনামিক স্ট্যাটস (প্যারেন্ট থেকে না আসলে ডিফল্ট জিরো দেখাবে)
  const totalSpent = statsData?.totalSpent || 0;
  const ticketsBooked = statsData?.ticketsBooked || 0;
  const upcomingEvents = statsData?.upcomingEvents || 0;

  return (
    <div className="space-y-8">
      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent */}
        <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md" radius="lg">
          <CardBody className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Spent</span>
              <h2 className="text-3xl font-extrabold text-white">
                ${totalSpent.toFixed(2)}
              </h2>
            </div>
            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>
          </CardBody>
        </Card>

        {/* Tickets Booked */}
        <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md" radius="lg">
          <CardBody className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tickets Booked</span>
              <h2 className="text-3xl font-extrabold text-white">
                {ticketsBooked}
              </h2>
            </div>
            <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <FaTicketAlt size={24} />
            </div>
          </CardBody>
        </Card>

        {/* Upcoming Events */}
        <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md" radius="lg">
          <CardBody className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Upcoming Events</span>
              <h2 className="text-3xl font-extrabold text-white">
                {upcomingEvents}
              </h2>
            </div>
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FaCalendarDay size={24} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 👤 Profile Update Panel */}
      <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md max-w-3xl" radius="lg">
        <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">Profile Information</h3>
          <p className="text-slate-400 text-xs">Update your public details and biography details.</p>
        </CardHeader>
        <CardBody className="pt-6">
          <Form onSubmit={handleProfileSubmit} className="space-y-4 w-full">
            <Input
              label="Full Name"
              labelPlacement="outside"
              placeholder="John Doe"
              value={formData.name}
              onValueChange={(val) => handleInputChange("name", val)}
              className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white"
            />

            <Input
              label="Avatar URL"
              labelPlacement="outside"
              placeholder="https://api.dicebear.com/7.x/adventurer/svg?seed=John"
              value={formData.avatar}
              onValueChange={(val) => handleInputChange("avatar", val)}
              className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white"
            />

            {/* 💡 ডাইনামিক টেক্সটএরিয়া ইনপুট */}
            <Textarea
              label="Biography"
              labelPlacement="outside"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onValueChange={(val) => handleInputChange("bio", val)}
              className="w-full text-white"
              classNames={{
                input: "min-h-[100px]",
              }}
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20"
              radius="lg"
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}