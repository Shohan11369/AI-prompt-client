import { getDb } from "@/lib/mongodb";
import TestimonialItem from "./TestimonialItem";

export default async function HomepageDynamicTestimonials() {
  const db = await getDb();
  const reviews = await db.collection("reviews").find().sort({ createdAt: -1 }).limit(6).toArray();

  if (reviews.length === 0) {
    return (
      <div className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Client Testimonials</h2>
        <p className="text-slate-400">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-10">Client Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <TestimonialItem key={r._id} review={{...r, _id: r._id.toString()}} />
        ))}
      </div>
    </div>
  );
}
