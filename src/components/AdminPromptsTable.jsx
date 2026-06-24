"use client";
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
  Button,
  Input
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminPromptsTable = ({ prompts }) => {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState({});

  const handleAction = async (id, action) => {
    const feedback = feedbacks[id] || "";
    if (action === 'reject' && !feedback) {
        alert("Please provide feedback for rejection.");
        return;
    }
    
    const res = await fetch(`/api/admin/prompts/${id}`, {
      method: action === 'delete' ? 'DELETE' : 'POST',
      body: JSON.stringify({ action, feedback }),
    });
    if (res.ok) {
      router.refresh();
      // Clear feedback for this prompt on success
      setFeedbacks(prev => ({ ...prev, [id]: "" }));
    }
  };

  return (
    <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
      <Table aria-label="Prompts table" removeWrapper>
        <TableContent>
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>CREATOR</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>FEEDBACK</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No prompts found</p>}>
            {prompts.map((p) => (
              <TableRow key={p._id.toString()}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.creatorName || p.creatorEmail}</TableCell>
                <TableCell>
                  <Chip size="sm" className={p.status === 'approved' ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}>{p.status || 'pending'}</Chip>
                </TableCell>
                <TableCell>
                  <Input 
                    size="sm"
                    placeholder="Feedback..."
                    value={feedbacks[p._id] || ""}
                    onChange={(e) => setFeedbacks(prev => ({ ...prev, [p._id]: e.target.value }))}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" color="success" onPress={() => handleAction(p._id, 'approve')}>Approve</Button>
                  <Button size="sm" color="warning" onPress={() => handleAction(p._id, 'reject')}>Reject</Button>
                  <Button size="sm" color="danger" onPress={() => handleAction(p._id, 'delete')}>Delete</Button>
                  <Button size="sm" color="primary" onPress={() => handleAction(p._id, 'feature')}>Feature</Button>
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