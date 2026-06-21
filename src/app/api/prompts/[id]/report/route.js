import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request, { params }) {
  const user = await getUser();
  if (!user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id } = await params;
  const { reason, description } = await request.json();

  await db.collection("reports").insertOne({
    promptId: new ObjectId(id),
    userId: new ObjectId(user.id),
    reason,
    description,
    status: "pending",
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, message: "Report submitted" });
}
