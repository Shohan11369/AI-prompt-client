import DashboardHeading from "@/components/DashboardHeading";
import { getDb } from "@/lib/mongodb";
import { getUser } from "@/lib/api/session";
import { Card, Chip } from "@heroui/react";
import StatusActions from "@/components/StatusActions";

const statusStyles = {
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const normalizeStatus = (paymentStatus, approvalStatus) => {
  if (approvalStatus) return approvalStatus;
  return "pending";
};

const AdminEnrollmentsPage = async () => {
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
        <Card className="glass border-slate-200 p-6" radius="lg">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Enrollments</span>
            <h2 className="text-3xl font-extrabold text-slate-900">{rows.length}</h2>
        </Card>
        <Card className="glass border-slate-200 p-6" radius="lg">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Unique Users</span>
            <h2 className="text-3xl font-extrabold text-slate-900">{new Set(rows.map((row) => row.attendeeEmail)).size}</h2>
        </Card>
        <Card className="glass border-slate-200 p-6" radius="lg">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <h2 className="text-3xl font-extrabold text-slate-900">${rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}</h2>
        </Card>
      </div>

      <Card
        className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl"
        radius="lg"
      >
        <div className="p-0 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200 rounded-t-xl">
              <tr>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">USER</th>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">EMAIL</th>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">EVENT</th>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">ORGANIZER</th>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">PAID</th>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">STATUS</th>
                <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-4 px-6 font-bold text-slate-900">{row.attendeeName}</td>
                  <td className="py-4 px-6 text-slate-600">{row.attendeeEmail}</td>
                  <td className="py-4 px-6 text-indigo-600 font-semibold">{row.eventTitle}</td>
                  <td className="py-4 px-6 text-slate-600">{row.organizerEmail || "-"}</td>
                  <td className="py-4 px-6 font-semibold text-green-600">${row.amount.toFixed(2)}</td>
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
export default AdminEnrollmentsPage;
