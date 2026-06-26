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
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const AdminPromptsTable = ({ prompts: initialPrompts }) => {
  const router = useRouter();
  const [prompts, setPrompts] = useState(initialPrompts);
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
          
          if (action === 'delete') {
            setPrompts(prev => prev.filter(p => p._id !== id));
          } else {
            setPrompts(prev => prev.map(p => 
              p._id === id ? { ...p, status: action === 'approve' ? 'approved' : 'rejected' } : p
            ));
          }
          
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
            <thead className="bg-slate-100 border-b border-slate-200 rounded-t-xl">
                <tr>
                    <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">TITLE</th>
                    <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">CREATOR</th>
                    <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">COPY COUNT</th>
                    <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">STATUS</th>
                    <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">FEEDBACK</th>
                    <th className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {prompts.map((p) => (
                <tr key={p._id} className="border-b border-slate-200 bg-slate-100 hover:bg-slate-50 transition-colors duration-150">
                    <td className="py-4 px-6 font-bold text-slate-900">{p.title}</td>
                    <td className="py-4 px-6 text-slate-600">{p.creatorName || p.organizationEmail}</td>
                    <td className="py-4 px-6 text-slate-600">{p.copyCount || 0}</td>
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