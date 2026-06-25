import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { ObjectId } from "mongodb";
import Link from "next/link";
import CopyButton from "@/components/interactions/CopyButton";

export default async function SavedPromptsPage() {
  const user = await getUser();
  const db = await getDb();
  
  const bookmarks = await db.collection("bookmarks").find({ userId: new ObjectId(user.id) }).toArray();
  const promptIds = bookmarks.map(b => b.promptId);
  const savedPrompts = await db.collection("events").find({ _id: { $in: promptIds } }).toArray();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Prompts</h1>
      {savedPrompts.length === 0 ? <p>No saved prompts.</p> : (
        <div className="space-y-4">
          {savedPrompts.map(p => (
            <div key={p._id} className="p-4 border rounded flex justify-between items-center">
              <span>{p.title}</span>
              <div className="flex gap-2">
                <Link href={`/events/${p._id}`} className="text-blue-500">View Details</Link>
                <CopyButton promptText={p.description || p.title} promptId={p._id.toString()} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

