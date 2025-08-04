import danhSachKhoaHocAPI from "@/apis/apiCalls/danh-sach-khoa-hoc-api";
import { useQuery } from "@tanstack/react-query";
import Banner from "./banner";
import SectionCards from "./section-cards";
import devLog from "@/utils/loggerFn";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryFn: danhSachKhoaHocAPI,
    queryKey: ["danh sach khoa hoc"],
  });

  devLog("data:", data);
  devLog("isLoading:", isLoading);
  devLog("error:", error);

  return (
    <div>
      <Banner />
      <SectionCards />
    </div>
  );
}
