import thongTinNguoiDungApi from "@/apis/apiCalls/thong-tin-nguoi-dung-api";
import { useAppDispatch } from "@/hooks/hook";
import { setUserInfoUI, setIsLogin } from "@/store/slices/user";
import type { UserInfoUI } from "@/apis/apiCalls/thong-tin-nguoi-dung-api";
import { useQuery } from "@tanstack/react-query";
import { LOCAL_USER } from "@/constants/config";
import { useEffect, type ReactNode } from "react";

export default function AppInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const userLogin = JSON.parse(localStorage.getItem(LOCAL_USER) || "null");
  const token = userLogin?.accessToken;

  const { data, isError, isLoading } = useQuery<UserInfoUI>({
    queryKey: ["user info ui"],
    queryFn: () => thongTinNguoiDungApi(),
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserInfoUI(data));
      dispatch(setIsLogin());
    }
  }, [data, isLoading, dispatch]);

  if (isError) return <div>Error loading user info</div>;

  return <div>{children}</div>;
}
