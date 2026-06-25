"use client";
import DashboardSideBar from "@/components/DashboardSidebar";
const DashboardLayout = ({ children }) => {

    // console.log(role);

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-pink-900/10 via-brand-secondary/10 to-transparent text-slate-900">
            <DashboardSideBar />
            <div className="px-6 py-10 max-w-5xl w-full">
                {children}
            </div>
        </div>
    );
};
// /dashboard/organizer 
export default DashboardLayout;
