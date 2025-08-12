import { useQuery } from "@tanstack/react-query";
import danhSachKhoaHocAPI from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";

const useSearchCourses = function (searchQuery: string = "") {
  return useQuery<KhoaHoc[], Error>({
    queryKey: ["search courses", searchQuery],
    queryFn: () => danhSachKhoaHocAPI(searchQuery),
    enabled: !!searchQuery
  });
};

export default useSearchCourses;
