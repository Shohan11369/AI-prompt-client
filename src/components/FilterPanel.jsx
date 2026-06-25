"use client";

import { useState } from "react";
import { Card, Input, Button, Label } from "@heroui/react";
import { FaSearch, FaSlidersH, FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Music", "Tech", "Sports", "Arts", "Business", "Food", "Other"];
const LOCATIONS = ["New York", "San Francisco", "London", "Dhaka", "Tokyo", "Berlin", "Online"];

export default function FilterPanel() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (search) {
      params.set("search", search);
    }
    if (category) {
      params.set("category", category);
    }
    if (location) {
      params.set("location", location);
    }
    router.push(`/events?${params.toString()}`);
  };
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    router.push("/events")
  }


  return (
    <Card className="relative overflow-hidden bg-white border border-slate-200 p-8 shadow-xl rounded-3xl" radius="none">
      
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 items-end">
        {/* Search Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="search-title" className="text-xs font-bold uppercase tracking-wider text-slate-500">Search Title</Label>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="search-title"
            placeholder="Search keyword..."
            startContent={<FaSearch className="text-brand-primary text-sm mr-1" />}
            variant="bordered"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary hover:border-slate-300 text-slate-900 text-sm cursor-pointer h-12 flex items-center transition-all duration-300"
          />
        </div>

        {/* Category Selector */}
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="filter-category" className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</Label>
          <div className="relative group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 bg-slate-900/60 border border-white/10 rounded-xl px-3 text-white text-sm outline-none focus:border-pink-500"
            >
              <option value="">All Categories</option>

              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-slate-900 text-white"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* Location Selector */}
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="filter-location" className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</Label>
          <div className="relative group">
            <div className="relative w-full">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 bg-slate-900/60 border border-white/10 rounded-xl px-3 pr-10 text-white text-sm appearance-none outline-none focus:border-pink-500"
              >
                <option value="">All Locations</option>

                {LOCATIONS.map((loc) => (
                  <option
                    key={loc}
                    value={loc}
                    className="bg-slate-900 text-white"
                  >
                    {loc}
                  </option>
                ))}
              </select>

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <Button
            onClick={handleApplyFilters}
            className="flex-grow bg-brand-primary text-white font-bold h-12 shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            startContent={<FaSlidersH size={13} />}
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="bordered"
            className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold h-12 transition-all duration-200 px-4 min-w-0"
            title="Reset Filters"
          >
            <FaHistory size={13} className="text-slate-500 hover:text-slate-900" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
