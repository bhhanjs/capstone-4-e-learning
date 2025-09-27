import { useState } from "react";
import UserTable from "./user-table";
import TableSearch from "@/components/shared/dashboard/table-search";
import AddUserModal from "./add-user-modal";



export default function QuanLyNguoiDung() {
const [open, setOpen] = useState(false)


  return (
    <div className=" bg-algo-off-white rounded-xl px-7 py-9 w-full">
      <TableSearch  onAddClick= {()=> setOpen(true)} />
      <UserTable />
      <AddUserModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
