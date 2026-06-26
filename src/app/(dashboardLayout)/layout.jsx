"use client";
import DashboardSideBar from "@/components/DashboardSidebar";
const DashboardLayout = ({ children }) => {

    // console.log(role);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-pink-900/10 via-brand-secondary/10 to-transparent text-slate-900">
            <DashboardSideBar />
            <div className="flex-1 px-4 py-8 md:px-6 md:py-10 w-full overflow-x-hidden">
                {children}
            </div>
        </div>
    );
};
// /dashboard/organizer 
export default DashboardLayout;
