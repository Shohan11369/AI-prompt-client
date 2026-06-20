import {
  getOrganizerAttendees,
  updateOrganizerAttendeeStatus,
} from "@/lib/api/organizer/data";
import { getUser } from "@/lib/api/session";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const user = await getUser();
    const formData = await request.formData();
    const status = formData.get("status");

    if (!user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await updateOrganizerAttendeeStatus({
      organizerEmail: user.email,
      bookingId: params.bookingId,
      status,
    });

    if (!result?.modifiedCount) {
      return NextResponse.json(
        { message: "Booking not found or not allowed" },
        { status: 404 },
      );
    }

    const referer =
      request.headers.get("referer") || "/dashboard/organizer/attendees";
    return NextResponse.redirect(new URL(referer, request.url));
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update attendee status", error: error.message },
      { status: 500 },
    );
  }
}
