import fetcher from "../fetcher";

export interface DataType {
  maKhoaHoc: string;
  taiKhoan: string;
}
const huyGhiDanhApi = async function (data: DataType) {
  try {
    const response = await fetcher.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
    return response.data;
  } catch (error) {
    console.log("error delete course:", error);
    throw error;
  }
};

export default huyGhiDanhApi;
