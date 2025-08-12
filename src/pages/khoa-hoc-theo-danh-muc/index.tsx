import khoaHocTheoDanhMucApi from "@/apis/apiCalls/khoa-hoc-theo-danh-muc";
import type { KhoaHoc } from "@/apis/apiCalls/khoa-hoc-theo-danh-muc";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import devLog from "@/utils/loggerFn";
import CourseCard from "../../components/shared/body/course-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function KhoaHocTheoDanhMuc() {
  const { maDanhMuc } = useParams();
  const MaNhom = "GP01";

  console.log("maDanhMuc:", maDanhMuc);

  const { data, isLoading, isError } = useQuery<KhoaHoc[]>({
    queryKey: ["khoa hoc theo danh muc", maDanhMuc, MaNhom],
    queryFn: () =>
      khoaHocTheoDanhMucApi({
        maDanhMuc: maDanhMuc || "",
        MaNhom,
      }),
    enabled: !!maDanhMuc,
  });

  devLog("data from params:", data);
  devLog("isLoading:", isLoading);
  devLog("isError:", isError);

  if (isError) return <div>Fail loading the courses list...</div>;
  if (isLoading)
    return (
      <div className="container mx-auto flex flex-col h-72">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full " />
      </div>
    );

  return (
    <div className="container mx-auto">
      {data && (
        <section className="course__list p-6 space-y-7 py-12">
          <h2 className="text-3xl font-bold text-algo-charcoal">
            {data[0].danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9  bg-[#fefefe]">
            {data.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
