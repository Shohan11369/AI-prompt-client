import DashboardHeading from "@/components/DashboardHeading";
import { serverFetch } from "@/lib/api/server";
import { getUser } from "@/lib/api/session";
import { Card } from "@heroui/react";
import {
  FaCalendarDay,
  FaDollarSign,
  FaTicketAlt,
} from "react-icons/fa";

const AttendeeOverviewPage = async () => {
  const user = await getUser();
  const statsData = user?.email
    ? await serverFetch(`/api/user/attendee-stats/${user.email}`)
    : null;

  const stats = statsData?.stats || {};

  const totalSpent = Number(stats.totalSpent || 0);
  const ticketsBooked = Number(stats.ticketsBooked || 0);
  const upcomingEvents = Number(stats.upcomingEvents || 0);

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="User Overview"
        description="Track your bookings, payments, and upcoming activity"
      />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Spent */}
        <Card className="bg-brand-background/40 border border-brand-primary/20 shadow-inner" radius="lg">
          <div className="p-6 flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                Total Spent
              </span>

              <h2 className="text-3xl font-extrabold text-slate-950">
                ${totalSpent.toFixed(2)}
              </h2>
            </div>

            <div className="p-3.5 bg-green-500/10 text-green-700 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>

          </div>
        </Card>

        {/* Booked */}
        <Card className="bg-brand-background/40 border border-brand-primary/20 shadow-inner" radius="lg">
          <div className="p-6 flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                Booked
              </span>

              <h2 className="text-3xl font-extrabold text-slate-950">
                {ticketsBooked}
              </h2>
            </div>

            <div className="p-3.5 bg-brand-primary/10 text-brand-primary rounded-2xl border border-brand-primary/20">
              <FaTicketAlt size={24} />
            </div>

          </div>
        </Card>

        {/* Upcoming */}
        <Card className="bg-brand-background/40 border border-brand-primary/20 shadow-inner" radius="lg">
          <div className="p-6 flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                Upcoming AI
              </span>

              <h2 className="text-3xl font-extrabold text-slate-950">
                {upcomingEvents}
              </h2>
            </div>

            <div className="p-3.5 bg-brand-secondary/10 text-brand-secondary rounded-2xl border border-brand-secondary/20">
              <FaCalendarDay size={24} />
            </div>

          </div>
        </Card>

      </div>

    </div>
  );
};

export default AttendeeOverviewPage;
