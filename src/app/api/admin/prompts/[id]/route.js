import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    const { id } = await params;
    const { action, feedback } = await req.json();

    const db = await getDb();
    const update = {};

    switch (action) {
        case 'approve':
            update.status = 'approved';
            break;
        case 'reject':
            update.status = 'rejected';
            update.rejectionFeedback = feedback;
            break;
        case 'feature':
            update.featured = true;
            break;
        default:
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await db.collection("reports").updateOne({ _id: new ObjectId(id) }, { $set: update });
    return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    console.log("Attempting to delete report with ID:", id);
    const db = await getDb();
    const result = await db.collection("reports").deleteOne({ _id: new ObjectId(id) });
    console.log("Delete result:", result);
    return NextResponse.json({ success: result.deletedCount === 1 });
}
