import AdminPromptsTable from "@/components/AdminPromptsTable";
import DashboardHeading from "@/components/DashboardHeading";

const AdminPromptsPage = () => {
    return (
        <div className="p-6">
            <DashboardHeading title="All Prompts" description="Review and manage marketplace prompts" />
            <AdminPromptsTable />
        </div>
    );
};

export default AdminPromptsPage;