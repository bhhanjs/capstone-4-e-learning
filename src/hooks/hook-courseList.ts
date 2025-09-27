import danhSachKhoaHocAPI from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useRef } from "react";

const useCourseList = function (searchQuery?: string) {
  const lastNonEmptyRef = useRef<{ query?: string; data?: KhoaHoc[] } | null>(
    null
  );

  const query = useQuery({
    queryKey: ["courseList", searchQuery ?? ""],
    queryFn: async () => {
      try {
        const data = await danhSachKhoaHocAPI(searchQuery);
        return data;
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 404) {
          return [];
        }
        throw error;
      }
    },
    placeholderData: keepPreviousData,

    select: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        lastNonEmptyRef.current = { query: searchQuery, data };
        return data;
      }
      return lastNonEmptyRef.current?.data;
    },
  });

  return query;
};

export default useCourseList;
