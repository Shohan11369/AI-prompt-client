import DashboardHeading from "@/components/DashboardHeading";
import { Card } from "@heroui/react";
import { FaUsers, FaFileAlt, FaDollarSign, FaCopy, FaCommentAlt } from "react-icons/fa";
import { getDb } from "@/lib/mongodb";

const AdminOverviewPage = async () => {
    const db = await getDb();

    // Fetch real statistics
    const totalUsers = await db.collection("user").countDocuments({});
    const totalPrompts = await db.collection("prompts").countDocuments({});
    const totalReviews = await db.collection("reviews").countDocuments({});
    const totalCopies = await db.collection("prompt_copies").countDocuments({});

    const stats = {
        totalUsers,
        totalPrompts,
        totalReviews,
        totalCopies,
    };

    return (
        <div className="space-y-8">
            <DashboardHeading title="Admin Dashboard" description="Platform overview and management" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border border-slate-200 bg-white shadow-sm p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Users</span>
                        <FaUsers className="text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalUsers}</h2>
                </Card>
                <Card className="border border-slate-200 bg-white shadow-sm p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Prompts</span>
                        <FaFileAlt className="text-pink-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalPrompts}</h2>
                </Card>
                <Card className="border border-slate-200 bg-white shadow-sm p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Reviews</span>
                        <FaCommentAlt className="text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalReviews}</h2>
                </Card>
                <Card className="border border-slate-200 bg-white shadow-sm p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Copies</span>
                        <FaCopy className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalCopies}</h2>
                </Card>
            </div>
        </div>
    );
};

export default AdminOverviewPage;
