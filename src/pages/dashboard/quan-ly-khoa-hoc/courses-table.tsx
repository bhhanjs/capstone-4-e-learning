import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useCourseList from "@/hooks/hook-courseList";
import { setSearchTerm } from "@/store/slices/danshboard";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import courseImg from "@/assets/20944332.jpg";

export default function CoursesTable() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { searchTerm } = useAppSelector((state) => state.dashboardSlice);

  const { data, isLoading, isError } = useCourseList(searchTerm);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSearchTerm(""));
    };
  }, [dispatch]);

  if (isError) return <div>Error in fetching user list ...</div>;

  const pageSize = 5;
  const totalPages = Math.ceil((data?.length || 0) / pageSize);
  const start = (page - 1) * pageSize;
  const paginateCourses = (data ?? []).slice(start, start + pageSize);

  return (
    <>
      <div className="p-4">
        <Table className="border border-gray-300 text-center">
          <TableHeader>
            <TableRow className="h-20 font-bold text-[16px]">
              <TableHead className="table-header-cell">STT</TableHead>
              <TableHead className="table-header-cell">Mã khóa học</TableHead>
              <TableHead className="table-header-cell">Tên khóa học</TableHead>
              <TableHead className="table-header-cell">Hình ảnh</TableHead>
              <TableHead className="table-header-cell">Lượt xem</TableHead>
              <TableHead className="table-header-cell">Người tạo</TableHead>
              <TableHead className="text-right table-header-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              paginateCourses.map((course: KhoaHoc, i) => (
                <TableRow key={`${course.maKhoaHoc} + ${i}`} className="h-15">
                  <TableCell className="table-body-cell">
                    {start + i + 1}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {course.maKhoaHoc}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {course.tenKhoaHoc}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    <img
                      src={courseImg}
                      alt="course img"
                      className="w-12 h-auto mx-auto"
                    />
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {course.luotXem}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {course.ngayTao}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end ">
                    <Button className="bg-[#6abc6c] hover:bg-[#6abc6b9c]">
                      Ghi danh
                    </Button>
                    <Button className="bg-[#e5cd52] hover:bg-[#e5cc52b3]">
                      Sửa
                    </Button>
                    <Button className="bg-[#e2787c] hover:bg-[#e2787cbd]">
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* pagination */}
        {!isLoading && (data ?? []).length !== 0 && (
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              &lt; Trước
            </Button>

            {[1, 2, 3]
              .filter((p) => p <= totalPages)
              .map((p) => (
                <Button
                  key={p}
                  className={`${p === page ? "page" : "pageNumber"}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            {page > 4 && <span className="px-2">...</span>}
            {Array.from({ length: 3 }, (_, i) => page - 1 + i)
              .filter((p) => p > 3 && p < totalPages - 2)
              .map((p) => (
                <Button
                  key={p}
                  className={`${p === page ? "page" : "pageNumber"}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            {page < totalPages - 3 && <span className="px-2">...</span>}
            {[totalPages - 2, totalPages - 1, totalPages]
              .filter((p) => p > 3 && p <= totalPages)
              .map((p) => (
                <Button
                  key={p}
                  className={`${p === page ? "page" : "pageNumber"}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau &gt;
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
