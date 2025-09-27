import fetcher from "../fetcher";

export interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}

export interface UserInfoUI {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

const thongTinNguoiDungApi = async function (): Promise<UserInfoUI> {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error api thong tin nguoi dung:", error);
    throw error;
  }
};

export default thongTinNguoiDungApi;
