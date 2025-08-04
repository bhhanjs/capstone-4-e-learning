import fetcher from "../fetcher";

export interface DanhMuc {
  maDanhMuc: string;
  tenDanhMuc: string;
}

const danhMucAPI = async function (): Promise<DanhMuc[]> {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
    console.log("danh muc api response :", response);
    console.log("danh muc api response.data :", response.data);
    return response.data;
  } catch (error) {
    console.log("danhMucAPI error:", error);
    throw error;
  }
};

export default danhMucAPI;
