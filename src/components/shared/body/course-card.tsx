import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import type { FC } from "react";
import courseImg from "@/assets/cute-astronaut-icon/8000_2_10.jpg";
import { useNavigate } from "react-router-dom";
import PATH from "@/routes/path";

interface CourseCardProps {
  course: KhoaHoc;
}
const CourseCard: FC<CourseCardProps> = function ({ course }) {
  const navigate = useNavigate();

  const handleClick = function (id: string) {
    navigate(PATH.CHI_TIET.replace(":maKhoaHoc", id));
  };

  return (
    <>
      <Card
        className="bg-[#fefefe] text-[#1e1e1e] hover:shadow-lg transition-shadow duration-300"
        onClick={() => handleClick(course.maKhoaHoc)}
      >
        <CardContent className="px-5 flex flex-col h-full">
          <img
            src={course.hinhAnh && courseImg}
            alt={course.tenKhoaHoc}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <div className="grow flex flex-col">
            <h3 className="text-lg font-semibold text-[#1e1e1e] mb-1">
              {course.tenKhoaHoc}
            </h3>
            <div className="grow">
              <p className="text-sm text-gray-700 mb-2 line-clamp-6">
                {course.moTa}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                <strong>Người tạo:</strong>
                {course.nguoiTao.hoTen || "Không rõ"}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                <strong>Danh mục:</strong>{" "}
                {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                <strong>Ngày tạo:</strong> {course.ngayTao}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#50c1a3] font-semibold">
                👁 {course.luotXem}
              </span>
              <Button className="bg-algo-mint-green hover:bg-algo-mint-green/80 text-algo-charcoal px-6 py-1 text-sm">
                Đăng Ký
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseCard;
