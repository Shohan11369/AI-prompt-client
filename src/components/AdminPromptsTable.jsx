import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button
} from "@heroui/react";

const AdminPromptsTable = () => {
  const prompts = [
    { _id: "p1", title: "Creative Story Generator", creator: "John Doe", status: "pending" },
    { _id: "p2", title: "Code Helper", creator: "Jane Smith", status: "approved" },
  ];

  return (
    <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
      <Table aria-label="Prompts table" removeWrapper>
        <TableContent>
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>CREATOR</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {prompts.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.creator}</TableCell>
                <TableCell>
                  <Chip size="sm" className={p.status === 'approved' ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}>{p.status}</Chip>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" color="success">Approve</Button>
                  <Button size="sm" color="danger">Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContent>
      </Table>
    </Card>
  );
};

export default AdminPromptsTable;