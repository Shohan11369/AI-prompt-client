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
} from "@heroui/react";

const AdminEventsTable = () => {
  const events = [
    {
      _id: "e1",
      organizerEmail: "organizer1@example.com",
      title: "Global Tech Summit 2026",
      category: "Tech",
      ticketPrice: 149.0,
      availableSeats: 120,
      status: "pending",
    },
    {
      _id: "e2",
      organizerEmail: "organizer2@example.com",
      title: "Symphony Under the Stars",
      category: "Music",
      ticketPrice: 45.0,
      availableSeats: 300,
      status: "approved",
    },
  ];

  return (
    <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table
          aria-label="Approve Organizer Events"
          className="min-w-[900px] w-full text-left border-collapse"
          removeWrapper
        >
          <TableContent>
            <TableHeader className="bg-slate-100 border-b border-slate-200 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                ORGANIZER EMAIL
              </TableColumn>
              <TableColumn
                isRowHeader
                className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50"
              >
                EVENT TITLE
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                CATEGORY
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                TICKET PRICE
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                CAPACITY
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                STATUS
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <p className="text-slate-500 py-10 text-center font-medium">
                  No event listings added by organizers.
                </p>
              }
            >
              {events.map((ev) => (
                <TableRow
                  key={ev._id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150 last:border-b-0"
                >
                  <TableCell className="py-4 px-6 align-middle font-semibold text-indigo-600">
                    {ev.organizerEmail}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle font-bold text-slate-900">
                    {ev.title}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-600 font-medium">
                    {ev.category}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle font-bold text-green-600">
                    ${ev.ticketPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-600 font-medium">
                    {ev.availableSeats} Seats
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${
                        ev.status === "approved"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : ev.status === "rejected"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      {ev.status || "pending"}
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

export default AdminEventsTable;
