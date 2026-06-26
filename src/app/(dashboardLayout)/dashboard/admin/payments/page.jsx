import { Card, Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { getDb } from "@/lib/mongodb";

const normalizeStatus = (paymentStatus, approvalStatus) => {
  if (approvalStatus) return approvalStatus;
  return paymentStatus || "pending";
};

const AdminPaymentsPage = async () => {
    const db = await getDb();

    // Admin sees all bookings (which represent payments)
    const bookings = await db
        .collection("bookings")
        .find({})
        .sort({ bookingDate: -1 })
        .toArray();

    const events = await db
        .collection("events")
        .find({})
        .project({ _id: 1, title: 1 })
        .toArray();

    const users = await db
        .collection("user")
        .find({})
        .project({ email: 1, name: 1 })
        .toArray();

    const eventMap = new Map(events.map((event) => [event._id.toString(), event.title]));
    const userMap = new Map(users.map((user) => [user.email, user.name]));

    const payments = bookings.map((booking) => {
        const eventTitle = eventMap.get(booking.evetId || booking.eventId) || booking.eventTitle || "Untitled Event";
        const userName = userMap.get(booking.attendeeEmail) || booking.attendeeEmail || "Unknown";
        
        return {
            _id: booking._id.toString(),
            user: userName,
            event: eventTitle,
            amount: Number(booking.amount) || 0,
            status: normalizeStatus(booking.paymentStatus, booking.approvalStatus),
            date: booking.bookingDate || booking.paidAt || new Date(),
        };
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
            case "succeeded":
                return "bg-green-100 text-green-700 border-green-200";
            case "rejected":
            case "failed":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-amber-100 text-amber-700 border-amber-200";
        }
    };

    return (
        <div className="p-6 space-y-6">
            <DashboardHeading title="All Payments" description="View transaction history" />
            <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl">
                <Table aria-label="Payments table" removeWrapper>
                    <TableContent>
                        <TableHeader className="bg-slate-100 border-b border-slate-200">
                            <TableColumn className="text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">USER</TableColumn>
                            <TableColumn className="text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">EVENT</TableColumn>
                            <TableColumn className="text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">AMOUNT</TableColumn>
                            <TableColumn className="text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">STATUS</TableColumn>
                            <TableColumn className="text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">DATE</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {payments.map((p) => (
                                <TableRow key={p._id} className="border-b border-slate-200 hover:bg-slate-50">
                                    <TableCell className="font-semibold text-slate-900">{p.user}</TableCell>
                                    <TableCell className="text-slate-700 font-medium">{p.event}</TableCell>
                                    <TableCell className="font-bold text-green-700">${p.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            size="sm"
                                            className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${getStatusColor(p.status)}`}
                                        >
                                            {p.status}
                                        </Chip>
                                    </TableCell>
                                    <TableCell className="text-slate-600">{new Date(p.date).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContent>
                </Table>
            </Card>
        </div>
    );
};

export default AdminPaymentsPage;
