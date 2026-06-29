import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { ObjectId } from "mongodb";

export default async function MyReviewsPage() {
  const user = await getUser();
  const db = await getDb();
  
  const reviews = await db
    .collection("reviews")
    .find({ userId: new ObjectId(user.id) })
    .toArray();
  
  const promptIds = [...new Set(reviews.map((r) => r.promptId))];
  // Assuming 'events' collection stores the prompt/event title as 'title'
  const prompts = await db
    .collection("events")
    .find({ _id: { $in: promptIds } })
    .toArray();
    
  const promptsMap = prompts.reduce((map, p) => {
    map[p._id.toString()] = p.title; // Using 'title' field
    return map;
  }, {});

  const reviewsWithPrompts = reviews.map((r) => ({
    ...r,
    promptName: promptsMap[r.promptId.toString()] || "Unknown Prompt",
  }));

  return (
    <div className="p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {reviewsWithPrompts.length === 0 ? (
        <p>No reviews submitted.</p>
      ) : (
        <div className="space-y-4 bg-gray-200 ">
          {reviewsWithPrompts.map((r) => (
            <div key={r._id} className="p-4 border rounded">
              <p className="font-bold text-lg">Name: {r.promptName}</p>
              <p className="text-sm">Review: {r.rating} Stars</p>
              <p className="mt-1"> Comment : {r.comment}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}