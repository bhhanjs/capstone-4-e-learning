import fetcher from "../fetcher";

import type { FormAddUser } from "@/pages/dashboard/quan-ly-nguoi-dung/add-user-modal";

const themNguoiDungApi = async function (data: FormAddUser) {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThemNguoiDung", data);
    return response.data;
  } catch (error) {
    console.log("Lỗi khi thêm người dùng:", error);
    throw error;
  }
};

export default themNguoiDungApi;
