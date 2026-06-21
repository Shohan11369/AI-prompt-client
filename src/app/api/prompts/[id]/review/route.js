import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request, { params }) {
  const user = await getUser();
  if (!user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id } = await params;
  const { rating, comment } = await request.json();

  await db.collection("reviews").insertOne({
    promptId: new ObjectId(id),
    userId: new ObjectId(user.id),
    name: user.name,
    email: user.email,
    rating,
    comment,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, message: "Review added" });
}
