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
        title="Attendee Overview"
        description="Track your bookings, payments, and upcoming activity"
      />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Spent */}
        <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md" radius="lg">
          <div className="p-6 flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Spent
              </span>

              <h2 className="text-3xl font-extrabold text-white">
                ${totalSpent.toFixed(2)}
              </h2>
            </div>

            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>

          </div>
        </Card>

        {/* Booked */}
        <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md" radius="lg">
          <div className="p-6 flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Booked
              </span>

              <h2 className="text-3xl font-extrabold text-white">
                {ticketsBooked}
              </h2>
            </div>

            <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <FaTicketAlt size={24} />
            </div>

          </div>
        </Card>

        {/* Upcoming */}
        <Card className="glass border-white/5 bg-slate-900/40 backdrop-blur-md" radius="lg">
          <div className="p-6 flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Upcoming Events
              </span>

              <h2 className="text-3xl font-extrabold text-white">
                {upcomingEvents}
              </h2>
            </div>

            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FaCalendarDay size={24} />
            </div>

          </div>
        </Card>

      </div>

    </div>
  );
};

export default AttendeeOverviewPage;