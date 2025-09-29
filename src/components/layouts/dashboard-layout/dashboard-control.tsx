import { Button } from "@/components/ui/button";
import { Home, Users, Book } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { DASHBOARD_COURSES, DASHBOARD_USERS } from "@/constants/config";
import { setActiveContent } from "@/store/slices/danshboard";
import { useNavigate } from "react-router-dom";
import PATH from "@/routes/path";

export default function DashboardControl() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeContent } = useAppSelector((state) => state.dashboardSlice);

  const handleSetActiveMenu = function (content: string) {
    dispatch(setActiveContent(content));
  };
  return (
    <aside className="w-30 bg-algo-solf-peach text-white flex flex-col items-center rounded-xl gap-20 py-6">
      <div className="p-4 text-xl font-bold text-center flex justify-center items-center">
        <div className="py-3 px-4 bg-algo-off-white text-algo-charcoal rounded-sm border-2 border-algo-bright-sage hover:rounded-lg">
          <Home
            className="w-5 h-5"
            onClick={() => {
              navigate(PATH.HOME);
            }}
          />
        </div>
      </div>
      <nav className="flex-1 space-y-5 p-2">
        <Button
          onClick={() => {
            handleSetActiveMenu(DASHBOARD_USERS);
            navigate(PATH.QUAN_LY_NGUOI_DUNG);
          }}
          className={`btn-toggle  ${
            activeContent === DASHBOARD_USERS
              ? "btn-toggle-active"
              : "btn-toggle-inactive"
          }`}
        >
          <Users className="w-5 h-5" /> Quản <br /> lý <br />
          người <br />
          dùng
        </Button>
        <Button
          onClick={() => {
            handleSetActiveMenu(DASHBOARD_COURSES);
            navigate(PATH.QUAN_LY_KHOA_HOC);
          }}
          className={`btn-toggle ${
            activeContent === DASHBOARD_COURSES
              ? "btn-toggle-active"
              : "btn-toggle-inactive"
          }`}
        >
          <Book className="w-5 h-5" /> Quản <br /> lý <br /> khóa <br /> học
        </Button>
      </nav>
    </aside>
  );
}
