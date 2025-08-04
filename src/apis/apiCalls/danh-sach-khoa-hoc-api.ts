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

const danhSachKhoaHocAPI = async function (): Promise<KhoaHoc[]> {
  try {
    const response = await fetcher.get(
      "/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
    );
    console.log("danh sach khoa hoc reponse api:", response.data);
    return response.data;
  } catch (error) {
    console.log("danh sach khoa hoc api error:", error);
    throw error
  }
};

export default danhSachKhoaHocAPI;
