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
    <Card className="shadow-inner border border-brand-primary/20 bg-brand-background/40 backdrop-blur-xl p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table aria-label="My Tickets Table" removeWrapper>
          <TableContent>
            <TableHeader className="bg-brand-background/40 border-b border-brand-primary/10 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-brand-primary/10" isRowHeader> NAME</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-brand-primary/10">DATE</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-brand-primary/10">QUANTITY</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-brand-primary/10">TOTAL PAID</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-brand-primary/10">STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p className="text-slate-600 py-10 text-center font-medium">No ticket passes booked yet. Explore Browse Events!</p>}>
              {tickets.map((ticket) => (
                <TableRow key={ticket._id} className="border-b border-brand-primary/10 hover:bg-brand-primary/5 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle font-bold text-slate-900">
                    <Link href={`/events/${ticket.evetId}`} className="hover:text-brand-primary hover:underline">
                      {ticket.eventTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-800 font-medium">{new Date(ticket.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-800 font-medium">{ticket.quantity} ticket(s)</TableCell>
                  <TableCell className="py-4 px-6 align-middle font-semibold text-green-700">${Number(ticket.amount)?.toFixed(2)}</TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={ticket.paymentStatus === "failed" ? "danger" : "success"}
                      className="font-bold uppercase text-[10px] tracking-wider border border-brand-primary/10 px-2"
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

