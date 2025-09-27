import TableSearch from "@/components/shared/dashboard/table-search";
import CoursesTable from "./courses-table";
import AddCourseModal from "./add-course-modal";
import { useState } from "react";

export default function QuanLyKhoaHoc() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" bg-algo-off-white rounded-xl px-7 py-9 w-full">
      <TableSearch onAddClick={() => setOpen(true)} />
      <CoursesTable />
      <AddCourseModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
