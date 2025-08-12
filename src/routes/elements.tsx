import { useRoutes } from "react-router-dom";
import type { ReactElement } from "react";
import PATH from "./path";
import HomeLayout from "../components/layouts/home-layout";
import HomePage from "../pages/homepage";
import KhoaHocTheoDanhMuc from "@/pages/khoa-hoc-theo-danh-muc";
import TimKiemKhoaHoc from "../pages/tim-kiem-khoa-hoc";
import ChiTiet from "../pages/chi-tiet";
import AuthLayout from "@/components/layouts/auth-layout";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import NotFound from "../pages/not-found";
import ThongTinTaiKhoan from "@/pages/thong-tin-tai-khoan";

const useRouterElements = function (): ReactElement | null {
  const elements = useRoutes([
    {
      path: PATH.HOME,
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: PATH.KHOA_HOC_THEO_DANH_MUC,
          element: <KhoaHocTheoDanhMuc />,
        },

        {
          path: PATH.TIM_KIEM_KHOA_HOC,
          element: <TimKiemKhoaHoc />,
        },
        {
          path: PATH.CHI_TIET,
          element: <ChiTiet />,
        },
        {
          path: PATH.THONG_TIN_TAI_KHOAN,
          element: <ThongTinTaiKhoan />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: PATH.DANG_KY,
          element: <Register />,
        },
        {
          path: PATH.DANG_NHAP,
          element: <Login />,
        },
      ],
    },

    {
      path: PATH.NOT_FOUND,
      element: <NotFound />,
    },
  ]);

  return elements;
};

export default useRouterElements;

// this is a custom hook (the function that we create by self) => it will return the React element base on the route => thats why type is ReactElement
