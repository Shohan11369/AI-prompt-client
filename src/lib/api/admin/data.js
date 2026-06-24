import { getDb } from "@/lib/mongodb";

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
      const prompt = await db.collection("prompts").findOne({ _id: report.promptId });
      const reporter = await db.collection("user").findOne({ _id: report.userId });

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
