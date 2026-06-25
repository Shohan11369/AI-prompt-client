import DashboardHeading from "@/components/DashboardHeading";
import AdminPromptsTable from "@/components/AdminPromptsTable";
import { getAllReports } from "@/lib/api/admin/data";

const ReportedPromptsPage = async () => {
    const reports = await getAllReports();
    
    // Map reported prompts to match AdminPromptsTable expectations
    const prompts = reports.map(r => ({
        _id: r._id,
        title: r.promptTitle,
        creatorName: r.reporter, // Displaying reporter as creator for now
        status: r.status || 'pending',
    }));

    return (
        <div className="p-6 space-y-6">
            <DashboardHeading title="Reported Prompts" description="Manage reported content" />
            <AdminPromptsTable prompts={prompts} />
        </div>
    );
};

export default ReportedPromptsPage;
