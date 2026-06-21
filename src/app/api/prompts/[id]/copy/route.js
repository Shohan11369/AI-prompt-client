import { getDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request, { params }) {
  const db = await getDb();
  const { id } = await params;
  await db.collection("prompts").updateOne(
    { _id: new ObjectId(id) },
    { $inc: { copyCount: 1 } }
  );
  return NextResponse.json({ success: true });
}
