import fetcher from "../fetcher";

interface ParamsType {
  maDanhMuc: string;
  MaNhom: string;
}

export interface KhoaHoc {
    maKhoaHoc:      string;
    biDanh:         string;
    tenKhoaHoc:     string;
    moTa:           string;
    luotXem:        number;
    hinhAnh:        string;
    maNhom:         string;
    ngayTao:        string;
    soLuongHocVien: number;
    nguoiTao:       NguoiTAO;
    danhMucKhoaHoc: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
    maDanhMucKhoahoc:  string;
    tenDanhMucKhoaHoc: string;
}

export interface NguoiTAO {
    taiKhoan:         string;
    hoTen:            string;
    maLoaiNguoiDung:  string;
    tenLoaiNguoiDung: string;
}

const khoaHocTheoDanhMucApi = async function (params: ParamsType): Promise<KhoaHoc[]> {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {
      params:params
    });
    console.log("params:", params);
    console.log("api response params:", response.data);
    return response.data;
  } catch (error) {
    console.log("error api khoa hoc theo danh muc:", error);
    throw error;
  }
};

export default khoaHocTheoDanhMucApi;

// Axios get() has the second argument is an AxiosRequestConfig object => that Config object has a special property called params => Params: Axios will return this object into a query string
