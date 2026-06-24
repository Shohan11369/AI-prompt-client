import DashboardHeading from "@/components/DashboardHeading";
import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { Card, Chip } from "@heroui/react";
import StatusActions from "@/components/StatusActions";

const statusStyles = {
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const normalizeStatus = (paymentStatus, approvalStatus) => {
  if (approvalStatus) return approvalStatus;
  return "pending";
};

const AdminPromptsPage = async () => {
  const user = await getUser();
  const db = await getDb();
  
  // Admin sees all bookings
  const bookings = await db
    .collection("bookings")
    .find({})
    .sort({ bookingDate: -1 })
    .toArray();
    
  const events = await db
    .collection("events")
    .find({})
    .project({ _id: 1, title: 1, organizationEmail: 1 })
    .toArray();
    
  const users = await db
    .collection("user")
    .find({
      email: {
        $in: bookings.map((booking) => booking.attendeeEmail).filter(Boolean),
      },
    })
    .project({ email: 1, name: 1 })
    .toArray();

  const eventMap = new Map(
    events.map((event) => [event._id.toString(), event]),
  );
  const userMap = new Map(users.map((entry) => [entry.email, entry]));
  
  const rows = bookings.map((booking) => {
    const event = eventMap.get(booking.evetId);
    const attendee = userMap.get(booking.attendeeEmail);
    return {
      id: booking._id.toString(),
      attendeeName:
        attendee?.name || booking.attendeeEmail?.split("@")[0] || "Unknown",
      attendeeEmail: booking.attendeeEmail || "",
      eventTitle: booking.eventTitle || event?.title || "Untitled Event",
      organizerEmail: event?.organizationEmail || "",
      quantity: Number(booking.quantity) || 0,
      amount: Number(booking.amount) || 0,
      status: normalizeStatus(booking.paymentStatus, booking.approvalStatus),
      bookingDate: booking.bookingDate || booking.paidAt || new Date(),
    };
  });

  return (
    <div className="space-y-6 mt-6">
      <DashboardHeading
        title="All Enrollments"
        description="Every payment booking from the database appears here"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5 p-6" radius="lg">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Enrollments</span>
            <h2 className="text-3xl font-extrabold text-white">{rows.length}</h2>
        </Card>
        <Card className="glass border-white/5 p-6" radius="lg">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Unique Attendees</span>
            <h2 className="text-3xl font-extrabold text-white">{new Set(rows.map((row) => row.attendeeEmail)).size}</h2>
        </Card>
        <Card className="glass border-white/5 p-6" radius="lg">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <h2 className="text-3xl font-extrabold text-white">${rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}</h2>
        </Card>
      </div>

      <Card
        className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl"
        radius="lg"
      >
        <div className="p-0 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
              <tr>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">ATTENDEE</th>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">EMAIL</th>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">EVENT</th>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">ORGANIZER</th>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">PAID</th>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">STATUS</th>
                <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                  <td className="py-4 px-6 font-bold text-white">{row.attendeeName}</td>
                  <td className="py-4 px-6 text-slate-300">{row.attendeeEmail}</td>
                  <td className="py-4 px-6 text-pink-500 font-semibold">{row.eventTitle}</td>
                  <td className="py-4 px-6 text-slate-300">{row.organizerEmail || "-"}</td>
                  <td className="py-4 px-6 font-semibold text-green-400">${row.amount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <Chip size="sm" className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${statusStyles[row.status]}`}>
                      {row.status}
                    </Chip>
                  </td>
                  <td className="py-4 px-6">
                    {(user.role === "admin" || user.role === "organizer") && (
                      <StatusActions id={row.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default AdminPromptsPage;


// AdminPromptsPage