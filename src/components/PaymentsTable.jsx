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

const PaymentsTable = ({ payments }) => {


  return (
    <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table aria-label="Payment History Table" removeWrapper>
          <TableContent>
            <TableHeader className="bg-slate-100 border-b border-slate-200 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50" isRowHeader>TRANSACTION ID</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">AMOUNT PAID</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">DATE</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No receipt records in transaction logs.</p>}>
              {payments.map((p) => (
                <TableRow key={p._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle font-semibold text-indigo-600 truncate max-w-[200px]">
                    {p.transactionId}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle font-bold text-green-600">${Number(p.amount)?.toFixed(2)}</TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-600 font-medium">{new Date(p?.paidAt)?.toLocaleDateString()}</TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={p.paymentStatus === "failed" ? "danger" : "success"}
                      className="font-bold uppercase text-[10px] tracking-wider border border-slate-200 px-2"
                    >
                      {p.paymentStatus || 'succeeded'}
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

export default PaymentsTable;

