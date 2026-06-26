import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getAllUsers() {
  const db = await getDb();
  return await db.collection("user").find({}).toArray();
}

export async function getAllPrompts() {
  const db = await getDb();
  return await db.collection("prompts").find({}).toArray();
}

export async function getAllReports() {
  const db = await getDb();
  const reports = await db.collection("reports").find({}).toArray();

  // For each report, we need to enrich it with prompt title and reporter name
  const enrichedReports = await Promise.all(
    reports.map(async (report) => {
      // Try finding by ObjectId first, fallback to string
      let promptId = report.promptId;
      if (!(promptId instanceof ObjectId)) {
        try {
          promptId = new ObjectId(promptId);
        } catch (e) {
          // Keep as is
        }
      }
      
      const prompt = await db.collection("prompts").findOne({ _id: promptId });
      
      // Similarly for userId
      let userId = report.userId;
      if (!(userId instanceof ObjectId)) {
        try {
          userId = new ObjectId(userId);
        } catch (e) {
          // Keep as is
        }
      }
      
      const reporter = await db.collection("user").findOne({ _id: userId });

      return {
        _id: report._id.toString(),
        promptTitle: prompt?.title || "Unknown Prompt",
        reporter: reporter?.name || reporter?.email || "Unknown User",
        reason: report.reason,
        description: report.description,
        status: report.status,
        createdAt: report.createdAt,
      };
    }),
  );

  return enrichedReports;
}

