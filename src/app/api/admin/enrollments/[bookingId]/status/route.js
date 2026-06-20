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

    const formData = await request.formData();
    const status = formData.get("status");
    const result = await updateBookingStatus({
      bookingId: params.bookingId,
      status,
    });

    if (!result?.modifiedCount) {
      return NextResponse.json(
        { message: "Booking not found or not allowed" },
        { status: 404 },
      );
    }

    revalidatePath("/dashboard/admin/enrollments");
    revalidatePath("/dashboard/organizer");
    revalidatePath("/dashboard/organizer/attendees");
    revalidatePath("/dashboard/attendee");
    revalidatePath("/dashboard/attendee/tickets");
    revalidatePath("/dashboard/attendee/payments");

    const referer =
      request.headers.get("referer") || "/dashboard/admin/enrollments";
    return NextResponse.redirect(new URL(referer, request.url));
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update booking status", error: error.message },
      { status: 500 },
    );
  }
}