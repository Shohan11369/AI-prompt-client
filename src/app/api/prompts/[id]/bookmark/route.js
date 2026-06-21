import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const user = await getUser();
  if (!user?.email) return NextResponse.json({ bookmarked: false });

  const db = await getDb();
  const { id } = await params;
  
  const existing = await db.collection("bookmarks").findOne({ 
    userId: new ObjectId(user.id), 
    promptId: new ObjectId(id) 
  });

  return NextResponse.json({ bookmarked: !!existing });
}

export async function POST(request, { params }) {
  const user = await getUser();
  if (!user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id } = await params;
  const promptId = new ObjectId(id);
  const userId = new ObjectId(user.id);

  const existing = await db.collection("bookmarks").findOne({ userId, promptId });

  if (existing) {
    await db.collection("bookmarks").deleteOne({ _id: existing._id });
    return NextResponse.json({ bookmarked: false, message: "Bookmark removed" });
  } else {
    await db.collection("bookmarks").insertOne({ userId, promptId, createdAt: new Date() });
    return NextResponse.json({ bookmarked: true, message: "Prompt bookmarked" });
  }
}
