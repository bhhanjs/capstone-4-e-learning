import { useQuery } from "@tanstack/react-query";
import chiTietApi from "@/apis/apiCalls/chi-tiet-api";
import type { ParamsType, KhoaHoc } from "@/apis/apiCalls/chi-tiet-api";


const useDetails = function (params:ParamsType) {
  return useQuery<KhoaHoc>({
    queryKey: ["chi tiet", params],
    queryFn: () => chiTietApi(params!),
    enabled: !!params.maKhoaHoc,
  });
};

export default useDetails;
