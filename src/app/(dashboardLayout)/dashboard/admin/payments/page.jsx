import { Card, Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
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

    return (
        <div className="p-6 space-y-6">
            <DashboardHeading title="All Payments" description="View transaction history" />
            <Card className="border border-white/5 bg-brand-background/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
                <Table aria-label="Payments table" removeWrapper>
                    <TableContent>
                        <TableHeader>
                            <TableColumn>USER</TableColumn>
                            <TableColumn>EVENT</TableColumn>
                            <TableColumn>AMOUNT</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>DATE</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {payments.map((p) => (
                                <TableRow key={p._id}>
                                    <TableCell className="font-bold text-white">{p.user}</TableCell>
                                    <TableCell className="text-brand-primary font-semibold">{p.event}</TableCell>
                                    <TableCell className="font-semibold text-green-400">${p.amount.toFixed(2)}</TableCell>
                                    <TableCell>{p.status}</TableCell>
                                    <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
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
