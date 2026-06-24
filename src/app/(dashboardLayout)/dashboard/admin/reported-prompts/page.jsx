import { Card, Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { getAllReports } from "@/lib/api/admin/data";

const ReportedPromptsPage = async () => {
    const reported = await getAllReports();

    return (
        <div className="p-6 space-y-6">
            <DashboardHeading title="Reported Prompts" description="Manage reported content" />
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
                <Table aria-label="Reported prompts table" removeWrapper>
                    <TableContent>
                        <TableHeader>
                            <TableColumn>PROMPT</TableColumn>
                            <TableColumn>REPORTER</TableColumn>
                            <TableColumn>REASON</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {reported.map(r => (
                                <TableRow key={r._id}>
                                    <TableCell className="font-bold text-white">{r.promptTitle}</TableCell>
                                    <TableCell>{r.reporter}</TableCell>
                                    <TableCell>{r.reason}</TableCell>
                                    <TableCell>{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button size="sm" color="danger">Remove</Button>
                                        <Button size="sm">Dismiss</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContent>
                </Table>
            </Card>
        </div>
    );
};

export default ReportedPromptsPage;