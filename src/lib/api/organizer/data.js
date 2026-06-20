import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

const normalizeStatus = (paymentStatus) => {
  if (!paymentStatus) return "pending";

  if (paymentStatus === "failed") return "rejected";
  if (paymentStatus === "paid" || paymentStatus === "succeeded")
    return "approved";

  return paymentStatus;
};

const resolveBookingStatus = (booking) => {
  return booking.approvalStatus || normalizeStatus(booking.paymentStatus);
};

export const getOrganizerAttendees = async (organizerEmail) => {
  if (!organizerEmail) return [];

  const db = await getDb();
  const eventsCollection = db.collection("events");
  const bookingsCollection = db.collection("bookings");
  const usersCollection = db.collection("user");

  const organizerEvents = await eventsCollection
    .find({ organizationEmail: organizerEmail })
    .project({ _id: 1, title: 1, price: 1, ticketPrice: 1, status: 1 })
    .toArray();

  const eventMap = new Map(
    organizerEvents.map((event) => [event._id.toString(), event]),
  );

  const organizerEventIds = organizerEvents.map((event) =>
    event._id.toString(),
  );

  if (!organizerEventIds.length) return [];

  const bookings = await bookingsCollection
    .find({ evetId: { $in: organizerEventIds } })
    .sort({ bookingDate: -1 })
    .toArray();

  const attendeeEmails = [
    ...new Set(
      bookings.map((booking) => booking.attendeeEmail).filter(Boolean),
    ),
  ];
  const users = await usersCollection
    .find({ email: { $in: attendeeEmails } })
    .project({ email: 1, name: 1, avatar: 1, image: 1 })
    .toArray();

  const userMap = new Map(users.map((user) => [user.email, user]));

  return bookings.map((booking) => {
    const relatedEvent = eventMap.get(booking.evetId);
    const attendee = userMap.get(booking.attendeeEmail);

    return {
      id: booking._id.toString(),
      name:
        attendee?.name ||
        booking.attendeeEmail?.split("@")[0] ||
        "Unknown Attendee",
      email: booking.attendeeEmail,
      eventTitle: booking.eventTitle || relatedEvent?.title || "Untitled Event",
      quantity: Number(booking.quantity) || 0,
      amount: Number(booking.amount) || 0,
      bookingDate: booking.bookingDate || booking.paidAt || new Date(),
      status: resolveBookingStatus(booking),
      paymentStatus: booking.paymentStatus || "pending",
      approvalStatus: booking.approvalStatus || "",
      eventId: booking.evetId,
    };
  });
};

export const getOrganizerAttendee = async (organizerEmail, attendeeEmail) => {
  const attendees = await getOrganizerAttendees(organizerEmail);
  return attendees.filter((attendee) => attendee.email === attendeeEmail);
};

export const updateOrganizerAttendeeStatus = async ({
  organizerEmail,
  bookingId,
  status,
}) => {
  if (!organizerEmail || !bookingId || !status) {
    return { matchedCount: 0, modifiedCount: 0 };
  }

  const db = await getDb();
  const bookingsCollection = db.collection("bookings");
  const eventsCollection = db.collection("events");
  const bookingObjectId = new ObjectId(bookingId);

  const booking = await bookingsCollection.findOne({ _id: bookingObjectId });
  if (!booking) {
    return { matchedCount: 0, modifiedCount: 0 };
  }

  const relatedEvent = await eventsCollection.findOne({ _id: booking.evetId });
  if (!relatedEvent || relatedEvent.organizationEmail !== organizerEmail) {
    return { matchedCount: 0, modifiedCount: 0 };
  }

  const approvalStatus = status === "approve" ? "approved" : "rejected";

  const result = await bookingsCollection.updateOne(
    { _id: bookingObjectId },
    {
      $set: {
        approvalStatus,
        approvalUpdatedAt: new Date(),
      },
    },
  );

  return result;
};

export const updateBookingStatus = async ({ bookingId, status }) => {
  if (!bookingId || !status) {
    return { matchedCount: 0, modifiedCount: 0 };
  }

  const db = await getDb();
  const bookingsCollection = db.collection("bookings");
  const bookingObjectId = new ObjectId(bookingId);

  const approvalStatus = status === "approve" ? "approved" : "rejected";

  return bookingsCollection.updateOne(
    { _id: bookingObjectId },
    {
      $set: {
        approvalStatus,
        approvalUpdatedAt: new Date(),
      },
    },
  );
};
