"use client"; 

import { useRouter } from "next/navigation";
import { baseURL } from "@/lib/api/baseUrl";

export default function StatusActions({ id }) {
  const router = useRouter();

  const updateStatus = async (status) => {

    const res = await fetch(`${baseURL}/api/admin/enrollments/${id}/status`, {
      method: "PATCH", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      router.refresh(); 
    } else {
      alert("সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={() => updateStatus("approve")}
        className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[12px] font-semibold text-green-400 hover:bg-green-500/20 transition-colors"
      >
        Approve
      </button>
      <button
        onClick={() => updateStatus("reject")}
        className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[12px] font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
      >
        Reject
      </button>
    </div>
  );
}
