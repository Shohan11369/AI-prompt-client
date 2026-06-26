import { getUser } from "@/lib/api/session";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) return <p>Unauthorized</p>;

  const db = await getDb();
  
  // Count all bookings for the user to be more inclusive
  const bookings = await db.collection("bookings").find({ attendeeEmail: user.email }).toArray();
  const isPremium = user.isPremium || bookings.length >= 4;
  
  // Total Prompts only makes sense for organizers. If attendee, it's 0.
  const totalPrompts = user.role === 'organizer' ? await db.collection("events").countDocuments({ organizerEmail: user.email }) : 0;
  
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="p-6 rounded-xl shadow-inner border border-white/20 bg-white/40 space-y-4">
        <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full border-2 border-pink-500/60" />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === 'organizer' && <p><strong>Total Prompts:</strong> {totalPrompts}</p>}
        <p><strong>Subscription:</strong> {isPremium ? "Premium" : "Free"}</p>
        
        {!isPremium && (
          <Link href="/events" className="bg-pink-600 text-white px-4 py-2 rounded-xl shadow-md block w-fit hover:bg-pink-700 transition">
            Upgrade to Premium
          </Link>
        )}
      </div>
    </div>
  );
}

