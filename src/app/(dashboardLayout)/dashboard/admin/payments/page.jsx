import { Card, Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";

const AdminPaymentsPage = () => {
    const payments = [
        { _id: "pay1", user: "John Doe", amount: 49.00, status: "completed" },
        { _id: "pay2", user: "Jane Smith", amount: 15.00, status: "pending" },
    ];

    return (
        <div className="p-6 space-y-6">
            <DashboardHeading title="All Payments" description="View transaction history" />
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
                <Table aria-label="Payments table" removeWrapper>
                    <TableContent>
                        <TableHeader>
                            <TableColumn>USER</TableColumn>
                            <TableColumn>AMOUNT</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {payments.map(p => (
                                <TableRow key={p._id}>
                                    <TableCell>{p.user}</TableCell>
                                    <TableCell>${p.amount.toFixed(2)}</TableCell>
                                    <TableCell>{p.status}</TableCell>
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