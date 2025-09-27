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
import { type User } from "@/apis/apiCalls/danh-sach-nguoi-dung-api";
import { Button } from "@/components/ui/button";
import useUserList from "@/hooks/hook-userList";

import { setUserList, setSearchTerm } from "@/store/slices/danshboard";


export default function UserTable() {
  const dispatch = useAppDispatch();
  const { userList, searchTerm } = useAppSelector(
    (state) => state.dashboardSlice
  );

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(userList.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginateUsers = userList.slice(start, start + pageSize);

  const { data, isLoading, isError } = useUserList(searchTerm);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserList(data));
    }
  }, [data, isLoading, dispatch]);
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
  useEffect(() => {
    return () => {
      dispatch(setSearchTerm(""));
    };
  }, [dispatch]);

  if (isError) return <div>Error in fetching user list ...</div>;

  return (
    <>
      <div className="p-4">
        <Table className="border border-gray-300 text-center">
          <TableHeader>
            <TableRow className="h-20 font-bold text-[16px]">
              <TableHead className="table-header-cell">STT</TableHead>
              <TableHead className="table-header-cell">Tài khoản</TableHead>
              <TableHead className="table-header-cell">Người dùng</TableHead>
              <TableHead className="table-header-cell">Họ và tên</TableHead>
              <TableHead className="table-header-cell">Email</TableHead>
              <TableHead className="table-header-cell">Số điện thoại</TableHead>
              <TableHead className="text-right table-header-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              paginateUsers.map((user: User, i) => (
                <TableRow key={`${user.taiKhoan} + ${i}`} className="h-15">
                  <TableCell className="table-body-cell">
                    {start + i + 1}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {user.taiKhoan}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {user.maLoaiNguoiDung}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {user.hoTen}
                  </TableCell>
                  <TableCell className="table-body-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="table-body-cell">{user.soDt}</TableCell>
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
        {!isLoading && userList.length !== 0 && (
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
            {page > 6 && <span className="px-2">...</span>}
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
