import DashboardHeading from "@/components/DashboardHeading";
import { getDb } from "@/lib/mongodb";
import { Card } from "@heroui/react";
import AdminPromptsTable from "@/components/AdminPromptsTable";

const AdminPromptsPage = async () => {
  const db = await getDb();
  
  const prompts = await db
    .collection("events")
    .find({})
    .toArray();
    
  const users = await db
    .collection("user")
    .find({
      email: { $in: prompts.map(p => p.organizationEmail).filter(Boolean) }
    })
    .project({ email: 1, name: 1 })
    .toArray();

  const userMap = new Map(users.map((entry) => [entry.email, entry]));

  const enrichedPrompts = prompts.map(p => {
    const creator = userMap.get(p.organizationEmail);
    return {
        ...p,
        _id: p._id.toString(), // Ensure ID is string for client
        creatorName: creator?.name || p.organizationEmail?.split("@")[0] || "Unknown",
        creatorEmail: p.organizationEmail || ""
    }
  });

  return (
    <div className="space-y-6 mt-6">
      <DashboardHeading
        title="All Prompts"
        description="Manage all prompts and their copy counts here"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5 p-6" radius="lg">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Prompts</span>
            <h2 className="text-3xl font-extrabold text-white">{enrichedPrompts.length}</h2>
        </Card>
      </div>

      <Card
        className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl"
        radius="lg"
      >
        <AdminPromptsTable prompts={enrichedPrompts} />
      </Card>
    </div>
  );
};
export default AdminPromptsPage;