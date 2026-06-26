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

const TransactionsTable = () => {
  const transactions = [
    {
      _id: "t1",
      userEmail: "attendee@example.com",
      transactionId: "ch_mock_stripe_transaction_12345",
      amount: 298.0,
      paidAt: "2026-06-03T10:00:00Z",
      paymentStatus: "paid",
    },
    {
      _id: "t2",
      userEmail: "organizer@example.com",
      transactionId: "ch_mock_stripe_transaction_99999",
      amount: 49.0,
      paidAt: "2026-06-02T15:00:00Z",
      paymentStatus: "paid",
    },
  ];

  return (
    <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table
          aria-label="Platform Transaction Logs"
          className="min-w-[900px] w-full text-left border-collapse"
          removeWrapper
        >
          <TableContent>
            <TableHeader className="bg-slate-100 border-b border-slate-200 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                USER EMAIL
              </TableColumn>
              <TableColumn
                isRowHeader
                className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50"
              >
                TRANSACTION ID
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                AMOUNT
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                DATE
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">
                PAYMENT STATUS
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <p className="text-slate-500 py-10 text-center font-medium">
                  No global transactions logged on this platform.
                </p>
              }
            >
              {transactions.map((t) => (
                <TableRow
                  key={t._id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150 last:border-b-0"
                >
                  <TableCell className="py-4 px-6 align-middle font-semibold text-slate-900">
                    {t.userEmail}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle font-mono text-xs text-indigo-600 truncate max-w-[250px]">
                    {t.transactionId}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle font-extrabold text-green-600">
                    ${t.amount?.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-600 font-medium">
                    {new Date(t.paidAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        t.paymentStatus === "failed" ? "danger" : "success"
                      }
                      className="font-bold uppercase text-[10px] tracking-wider border border-slate-200 px-2.5 py-1.5"
                    >
                      {t.paymentStatus || "succeeded"}
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

export default TransactionsTable;

