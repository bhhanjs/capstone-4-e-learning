import { useMutation } from "@tanstack/react-query";
import thongTinNguoiDungApi from "@/apis/apiCalls/thong-tin-nguoi-dung-api";

import { Button } from "@/components/ui/button";

export default function ThongTinTaiKhoan() {
  const userInfoMutation = useMutation({
    mutationFn: () => {
      return thongTinNguoiDungApi();
    },
    onSuccess: (data) => {
      console.log("data:", data);
    },

    onError: (error) => {
      console.log("error:", error);
    },
  });

  const handleClick = function () {
    userInfoMutation.mutate();
  };

  // devLog("data tai khoan:", data);
  // devLog(isLoading);
  // devLog("error tai khoan", error);

  return <Button onClick={handleClick}>ThongTinTaiKhoan</Button>;
}
