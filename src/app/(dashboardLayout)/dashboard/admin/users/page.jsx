import AdminUsersTable from "@/components/AdminUsersTable";
import DashboardHeading from "@/components/DashboardHeading";

const AdminUsersPage = () => {
    return (
        <div className="p-6">
            <DashboardHeading title="All Users" description="Manage platform users, roles, and status" />
            <AdminUsersTable />
        </div>
    );
};

export default AdminUsersPage;