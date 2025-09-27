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

const danhSachKhoaHocAPI = async function (
  searchQuery: string = ""
): Promise<KhoaHoc[]> {
  try {
    const url = searchQuery
      ? `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${encodeURIComponent(
          searchQuery
        )}`
      : "/QuanLyKhoaHoc/LayDanhSachKhoaHoc";
    const response = await fetcher.get(url);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.log("danh sach khoa hoc api error:", error);
    throw error;
  }
};

export default danhSachKhoaHocAPI;
