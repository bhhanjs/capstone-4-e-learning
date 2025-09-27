import fetcher from "../fetcher";

export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}

export interface UserListResponse {
  users: User[];
}

const danhSachNguoiDungApi = async function (
  searchTerm: string
): Promise<UserListResponse> {
  try {
    const url = searchTerm
      ? `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${searchTerm}`
      : "/QuanLyNguoiDung/LayDanhSachNguoiDung";
    const response = await fetcher.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export default danhSachNguoiDungApi;

// const danhSachNguoiDungApi = {
//   getAll: () => fetcher.get("/api/nguoi-dung"),
//   getById: (id: string) => fetcher.get(`/api/nguoi-dung/${id}`),
//   create: (data: any) => fetcher.post("/api/nguoi-dung", data),
//   update: (id: string, data: any) => fetcher.put(`/api/nguoi-dung/${id}`, data),
//   delete: (id: string) => fetcher.delete(`/api/nguoi-dung/${id}`),
// };
