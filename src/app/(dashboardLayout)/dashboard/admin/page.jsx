import DashboardHeading from "@/components/DashboardHeading";
import { Card } from "@heroui/react";
import { FaUsers, FaFileAlt, FaDollarSign, FaCopy, FaCommentAlt } from "react-icons/fa";

const AdminOverviewPage = () => {
    // This should ideally be fetched from an API
    const stats = {
        totalUsers: 120,
        totalPrompts: 45,
        totalReviews: 85,
        totalCopies: 320,
    };

    return (
        <div className="space-y-8">
            <DashboardHeading title="Admin Dashboard" description="Platform overview and management" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass border-white/5 bg-brand-background/40 backdrop-blur-md p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Users</span>
                        <FaUsers className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mt-2">{stats.totalUsers}</h2>
                </Card>
                <Card className="glass border-white/5 bg-brand-background/40 backdrop-blur-md p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Prompts</span>
                        <FaFileAlt className="text-brand-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mt-2">{stats.totalPrompts}</h2>
                </Card>
                <Card className="glass border-white/5 bg-brand-background/40 backdrop-blur-md p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Reviews</span>
                        <FaCommentAlt className="text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mt-2">{stats.totalReviews}</h2>
                </Card>
                <Card className="glass border-white/5 bg-brand-background/40 backdrop-blur-md p-6" radius="lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Copies</span>
                        <FaCopy className="text-green-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mt-2">{stats.totalCopies}</h2>
                </Card>
            </div>
        </div>
    );
};

export default AdminOverviewPage;
