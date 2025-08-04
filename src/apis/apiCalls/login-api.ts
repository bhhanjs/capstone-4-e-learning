import fetcher from "../fetcher";
import type { AxiosResponse } from "axios";

interface LoginDataType {
  taiKhoan: string;
  matKhau: string;
}

export interface LoginResponse {
  taiKhoan: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
  accessToken: string;
}

const loginAPI = async function (data: LoginDataType): Promise<LoginResponse> {
  try {
    console.log(data);
    const response: AxiosResponse<LoginResponse> = await fetcher.post(
      "/QuanLyNguoiDung/DangNhap",
      data
    );
    console.log("response login:", response);
    return response.data;
  } catch (error: unknown) {
    console.log("error of login api", error);
    throw error;
  }
};

export default loginAPI;
