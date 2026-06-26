import Image from "next/image";
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

const AdminUsersTable = ({ users }) => {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table aria-label="Users table" className="min-w-[900px] w-full text-left border-collapse" removeWrapper>
          <TableContent>
            <TableHeader className="bg-slate-100 border-b border-slate-200 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">AVATAR</TableColumn>
              <TableColumn isRowHeader className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">NAME</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">EMAIL</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">ROLE</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 bg-slate-50">STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No users found</p>}>
              {users.map((usr) => (
                <TableRow key={usr._id.toString()} className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle text-slate-600">
                    <div className="h-10 w-10 relative">
                      <Image
                        fill
                        src={
                          usr.image && (usr.image.startsWith("http") || usr.image.startsWith("/"))
                            ? usr.image
                            : "https://images.unsplash.com/photo-1549880181-56a44cf8a4a1"
                        }
                        className="rounded-full object-cover border border-slate-200"
                        alt="avatar"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle font-semibold text-slate-900">
                    {usr.name}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-600 font-medium">
                    {usr.email}
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${usr.role === "admin"
                        ? "bg-purple-100 text-purple-700 border-purple-200"
                        : usr.role === "organizer"
                          ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                          : "bg-green-100 text-green-700 border-green-200"
                        }`}
                    >
                      {usr.role}
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${usr.isBlocked
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-green-100 text-green-700 border-green-200"
                        }`}
                    >
                      {usr.isBlocked ? "Blocked" : "Active"}
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

export default AdminUsersTable;
