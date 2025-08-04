import fetcher from "../fetcher";

interface RegisterDataType {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

type RegisterContentType = RegisterDataType;

interface RegisterResAPI<T> {
  data: {
    content: T;
  };
}

const registerAPI = async function (
  data: RegisterDataType
): Promise<RegisterContentType> {
  try {
    const response: RegisterResAPI<RegisterContentType> = await fetcher.post(
      "/QuanLyNguoiDung/DangKy",
      data
    );
    console.log("response register api:", response);
    return response.data.content;
  } catch (error) {
    console.log("error register api:", error);
    throw error;
  }
};

export default registerAPI;
