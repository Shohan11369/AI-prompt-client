import Link from "next/link";
import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from "@heroui/react";

const TicketsTable = ({ tickets }) => {
  // console.log(tickets);

  return (
    <Card className="border border-white/5 bg-brand-background/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table aria-label="My Tickets Table" removeWrapper>
          <TableContent>
            <TableHeader className="bg-brand-background/40 border-b border-white/5 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-brand-background/20" isRowHeader>EVENT NAME</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-brand-background/20">DATE</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-brand-background/20">QUANTITY</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-brand-background/20">TOTAL PAID</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-brand-background/20">STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No ticket passes booked yet. Explore Browse Events!</p>}>
              {tickets.map((ticket) => (
                <TableRow key={ticket._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle font-bold text-white">
                    <Link href={`/events/${ticket.evetId}`} className="hover:text-brand-primary hover:underline">
                      {ticket.eventTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{new Date(ticket.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{ticket.quantity} ticket(s)</TableCell>
                  <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">${Number(ticket.amount)?.toFixed(2)}</TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={ticket.paymentStatus === "failed" ? "danger" : "success"}
                      className="font-bold uppercase text-[10px] tracking-wider border border-white/5 px-2"
                    >
                      {ticket.paymentStatus}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContent>
        </Table>
      </div>
    </Card>
  );
};

export default TicketsTable;

