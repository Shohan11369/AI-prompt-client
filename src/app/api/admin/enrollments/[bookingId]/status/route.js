import { updateBookingStatus } from "@/lib/api/organizer/data";
import { getUser } from "@/lib/api/session";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request, { params }) {
  try {
    const user = await getUser();
    if (!user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ভুল এখানে ছিল: formData এর বদলে json() ব্যবহার করুন
    const body = await request.json(); 
    const { status } = body;

    const result = await updateBookingStatus({
      bookingId: params.id, // আপনার ফোল্ডার স্ট্রাকচার [id] হলে params.id হবে
      status,
    });

    if (!result?.modifiedCount) {
      return NextResponse.json(
        { message: "Booking not found or update failed" },
        { status: 404 },
      );
    }

    // রিভ্যালিডেশন
    revalidatePath("/dashboard/admin/enrollments");
    
    // রিডাইরেক্টের বদলে JSON রেসপন্স পাঠান
    return NextResponse.json({ success: true, message: "Status updated" });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Failed to update", error: error.message },
      { status: 500 },
    );
  }
}