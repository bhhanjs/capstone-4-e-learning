import { useQuery } from "@tanstack/react-query";
import danhSachKhoaHocAPI from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";

export const useTop8Course = function () {
  return useQuery<KhoaHoc[]>({
    queryKey: ["courses", "top 8"],
    queryFn: async () => {
      const response = await danhSachKhoaHocAPI();
      return response.slice(0, 8);
    },
    staleTime: 1000 * 60 * 5,
  });
};
