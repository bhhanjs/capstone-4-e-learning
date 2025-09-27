import fetcher from "../fetcher";

export interface DataType {
  maKhoaHoc: string;
  taiKhoan: string;
}

const dangKyKhoahocApi = async function (data: DataType) {
  try {
    const response = await fetcher.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data);
    return response;
  } catch (error) {
    console.log("error dang ky khoa hoc", error);
    throw error;
  }
};

export default dangKyKhoahocApi;
