import { Outlet } from "react-router-dom";
import DashboardControl from "./dashboard-control";

export default function DashboardLayout() {
  return (
    <div className="bg-algo-mint-green w-[1440px] mx-auto">
      <div className="flex gap-1 min-h-screen p-4">
        <DashboardControl />
        <Outlet />
      </div>
    </div>
  );
}
