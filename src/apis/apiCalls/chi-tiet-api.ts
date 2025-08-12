import fetcher from "../fetcher";

export interface KhoaHoc {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: NguoiTAO;
  danhMucKhoaHoc: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}

export interface NguoiTAO {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}
export interface ParamsType {
  maKhoaHoc: string;
}

const chiTietApi = async function (params: ParamsType): Promise<KhoaHoc> {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params,
    });
    console.log("chi tiet api:", response.data);
    return response.data;
  } catch (error) {
    console.log("error chi tiet api", error);
    throw error;
  }
};

export default chiTietApi;
