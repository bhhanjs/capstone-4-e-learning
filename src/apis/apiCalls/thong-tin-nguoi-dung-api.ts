import fetcher from "../fetcher";

const thongTinNguoiDungApi = async function () {
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
