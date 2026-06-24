"use client";
import {
  Chip,
  Button,
  Input
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const statusStyles = {
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const AdminPromptsTable = ({ prompts }) => {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState({});

  const handleAction = async (id, action) => {
    const feedback = feedbacks[id] || "";
    if (action === 'reject' && !feedback) {
        toast.error("Please provide feedback for rejection.");
        return;
    }
    
    try {
        const res = await fetch(`/api/admin/prompts/${id}`, {
          method: action === 'delete' ? 'DELETE' : 'POST',
          body: JSON.stringify({ action, feedback }),
        });
        
        if (res.ok) {
          toast.success(`Prompt successfully ${action}ed.`);
          router.refresh();
          setFeedbacks(prev => ({ ...prev, [id]: "" }));
        } else {
            toast.error(`Failed to ${action} prompt.`);
        }
    } catch (error) {
        toast.error(`An error occurred while ${action}ing the prompt.`);
    }
  };

  return (
    <div className="p-0 overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                <tr>
                    <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">TITLE</th>
                    <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">CREATOR</th>
                    <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">COPY COUNT</th>
                    <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">STATUS</th>
                    <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">FEEDBACK</th>
                    <th className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {prompts.map((p) => (
                <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                    <td className="py-4 px-6 font-bold text-white">{p.title}</td>
                    <td className="py-4 px-6 text-slate-300">{p.creatorName || p.organizationEmail}</td>
                    <td className="py-4 px-6 text-slate-300">{p.copyCount || 0}</td>
                    <td className="py-4 px-6">
                        <Chip size="sm" className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${statusStyles[p.status] || statusStyles.pending}`}>
                            {p.status || 'pending'}
                        </Chip>
                    </td>
                    <td className="py-4 px-6">
                        <Input 
                            size="sm"
                            placeholder="Feedback..."
                            value={feedbacks[p._id] || ""}
                            onChange={(e) => setFeedbacks(prev => ({ ...prev, [p._id]: e.target.value }))}
                            className="max-w-[200px]"
                        />
                    </td>
                    <td className="py-4 px-6 flex gap-2">
                      {p.status === 'pending' && (
                        <>
                          <Button size="sm" color="success" onPress={() => handleAction(p._id, 'approve')}>Approve</Button>
                          <Button size="sm" color="warning" onPress={() => handleAction(p._id, 'reject')}>Reject</Button>
                        </>
                      )}
                      <Button size="sm" color="danger" onPress={() => handleAction(p._id, 'delete')}>Delete</Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default AdminPromptsTable;