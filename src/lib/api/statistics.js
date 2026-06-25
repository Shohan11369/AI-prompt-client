import { getDb } from "@/lib/mongodb";

export async function getStatistics() {
  const db = await getDb();
  
  const totalEvents = await db.collection("events").countDocuments({});
  const totalAttendees = await db.collection("bookings").countDocuments({});
  const orgs = await db.collection("events").distinct("organizationEmail");
  const totalOrgs = orgs.filter(email => email).length; // Filter out null/undefined emails
  
  return {
    totalEvents,
    totalAttendees,
    totalOrgs,
  };
}

