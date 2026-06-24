import AdminUsersTable from "@/components/AdminUsersTable";
import DashboardHeading from "@/components/DashboardHeading";
import { getAllUsers } from "@/lib/api/admin/data";

const AdminUsersPage = async () => {
    const users = await getAllUsers();

    return (
        <div className="p-6">
            <DashboardHeading title="All Users" description="Manage platform users, roles, and status" />
            <AdminUsersTable users={users} />
        </div>
    );
};

export default AdminUsersPage;