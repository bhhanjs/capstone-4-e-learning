import danhSachNguoiDungApi from "@/apis/apiCalls/danh-sach-nguoi-dung-api";
import { useQuery } from "@tanstack/react-query";
import { type UserListResponse } from "@/apis/apiCalls/danh-sach-nguoi-dung-api";
import { useEffect } from "react";

const useUserList = (searchTerm?: string) => {
  const query = useQuery<UserListResponse>({
    queryKey: ["userList", searchTerm],
    queryFn: () => danhSachNguoiDungApi(searchTerm || ""),
  });
  useEffect(() => {
    if (query.isSuccess) {
      console.log("User list fetched successfully:", query.data);
    }
    if (query.isError) {
      console.error("Error fetching user list:", query.error);
    }
  }, [query.isSuccess, query.isError, query.data, query.error]);

  return query;
};

export default useUserList;
