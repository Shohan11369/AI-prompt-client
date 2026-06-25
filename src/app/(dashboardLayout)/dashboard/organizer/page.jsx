import DashboardHeading from "@/components/DashboardHeading";
import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import { myEvents } from "@/lib/api/events/data";
import { getOrganizerAttendees } from "@/lib/api/organizer/data";
import { getUser } from "@/lib/api/session";

import { Card } from "@heroui/react";
import { FaCrown, FaCalendarAlt, FaUsers, FaDollarSign } from "react-icons/fa";

const OrganizerOverviewPage = async () => {
  const user = await getUser();
  const isPremium = user?.isPremium;
  const events = user?.email ? await myEvents(user.email) : [];
  const attendees = user?.email ? await getOrganizerAttendees(user.email) : [];

  const stats = {
    totalEvents: events?.length || 0,
    totalEnrollments: attendees?.length || 0,
    uniqueAttendees:
      new Set(attendees?.map((attendee) => attendee.email)).size || 0,
    estimatedRevenue:
      attendees?.reduce((sum, attendee) => {
        const price = Number(attendee?.amount ?? 0);
        return sum + price;
      }, 0) || 0,
  };

  return (
    <div className="space-y-6 mt-6">
      <DashboardHeading title="Overview" description="Dashboard Overview" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Hosted Events
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalEvents}
              </h2>
            </div>
            <div className="p-3.5 bg-brand-primary/10 text-brand-primary rounded-2xl border border-brand-primary/20">
              <FaCalendarAlt size={24} />
            </div>
          </div>
        </Card>
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Enrollments
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalEnrollments}
              </h2>
            </div>
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FaUsers size={24} />
            </div>
          </div>
        </Card>
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Unique Attendees
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.uniqueAttendees}
              </h2>
            </div>
            <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <FaUsers size={24} />
            </div>
          </div>
        </Card>
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Estimated Revenue
              </span>
              <h2 className="text-3xl font-extrabold text-white">{`$${stats.estimatedRevenue.toFixed(2)}`}</h2>
            </div>
            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      {!isPremium ? (
        <Card
          className="border border-yellow-500/20 bg-linear-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-yellow-400" /> Unlock Unlimited Event
                Creation
              </h3>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                Standard organizer accounts are limited to{" "}
                <strong>3 events</strong>. Upgrade to our Premium Package for{" "}
                <strong>$49.00</strong> to host unlimited events.
              </p>
            </div>
            <UpgradePremiumButton />
          </div>
        </Card>
      ) : (
        <Card
          className="border border-green-500/20 bg-linear-to-r from-green-500/5 via-amber-600/5 to-transparent relative overflow-hidden"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-green-400" /> Welcome to premium
                dashboard
              </h3>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                You can create more then 3 events now...
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OrganizerOverviewPage;

