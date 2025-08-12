import useDetails from "@/hooks/hook-details";
import { useParams } from "react-router-dom";
import type { ParamsType } from "@/apis/apiCalls/chi-tiet-api";
import devLog from "@/utils/loggerFn";
import { Skeleton } from "@/components/ui/skeleton";
import courseImg from "@/assets/cute-astronaut-icon/1974.jpg";

export default function ChiTiet() {
  const { maKhoaHoc } = useParams();
  const params: ParamsType = maKhoaHoc ? { maKhoaHoc } : { maKhoaHoc: "" };
  console.log("maKhoaHoc:", maKhoaHoc);
  const { data, isLoading, isError } = useDetails(params);
  devLog("ChiTiet:", data);
  devLog(isLoading);
  devLog(isError);

  if (isError)
    return <div className="container">Fail loading the courses details...</div>;
  if (isLoading)
    return (
      <div className="container mx-auto flex flex-col h-72">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full " />
      </div>
    );

  return (
    <div className="py-20">
      {data && (
        <div className="container mx-auto p-6 bg-algo-off-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-9">
            <img
              src={courseImg}
              alt={data.tenKhoaHoc}
              className="w-full md:w-1/3 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2 text-algo-charcoal">
                {data.tenKhoaHoc}
              </h1>
              <p className="text-gray-400 font-medium mb-4 -mt-1.5">
                {data.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </p>
              <p className="text-algo-charcoal text-[16px] mb-4 font-semibold">
                Mô tả:{" "}
                <span className="text-sm font-medium text-gray-400">
                  {data.moTa}
                </span>
              </p>
              <div className="flex flex-col gap-4 text-sm text-algo-charcoal font-semibold">
                <p>
                  Views:{" "}
                  <span className="text-sm font-medium text-gray-400">
                    {data.luotXem}
                  </span>
                </p>
                <p>
                  Group:{" "}
                  <span className="text-sm font-medium text-gray-400">
                    {data.maNhom}
                  </span>
                </p>
                <p>
                  Created:{" "}
                  <span className="text-sm font-medium text-gray-400">
                    {data.ngayTao}
                  </span>
                </p>
                <p>
                  Students:{" "}
                  <span className="text-sm font-medium text-gray-400">
                    {data.soLuongHocVien}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Creator & Category */}
          <div className="mt-8 p-4 bg-algo-off-white rounded-md text-algo-charcoal">
            <h2 className="text-xl font-semibold mb-3">Course Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-1">Created By</h3>
                <p>
                  <span className="font-medium">Name: </span>
                  {data.nguoiTao.hoTen}
                </p>
                <p>
                  <span className="font-medium">Account: </span>
                  {data.nguoiTao.taiKhoan}
                </p>
                <p>
                  <span className="font-medium">Role: </span>
                  {data.nguoiTao.tenLoaiNguoiDung}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Category</h3>
                <p>
                  <span className="font-medium">ID: </span>
                  {data.danhMucKhoaHoc.maDanhMucKhoahoc}
                </p>
                <p>
                  <span className="font-medium">Name: </span>
                  {data.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                </p>
              </div>
            </div>
          </div>

          {/* Enroll button */}
          <div className="mt-8 text-center">
            <button
              className="bg-algo-bright-sage hover:bg-algo-mint-green text-algo-charcoal font-semibold px-6 py-3 rounded-lg shadow-md transition"
              type="button"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
