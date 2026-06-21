import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { ObjectId } from "mongodb";

export default async function MyReviewsPage() {
  const user = await getUser();
  const db = await getDb();
  
  const reviews = await db.collection("reviews").find({ userId: new ObjectId(user.id) }).toArray();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 ? <p>No reviews submitted.</p> : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r._id} className="p-4 border rounded">
              <p className="font-bold">{r.rating} Stars</p>
              <p>{r.comment}</p>
              <p className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
