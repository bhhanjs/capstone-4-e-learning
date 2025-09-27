import * as yup from "yup";

import type { FormAddUser } from "./add-user-modal";

const schema: yup.ObjectSchema<FormAddUser> = yup
  .object({
    taiKhoan: yup.string().required("Tài khoản không được để trống"),
    matKhau: yup.string().required("Mật khẩu không được để trống"),
    hoTen: yup.string().required("Họ và tên không được để trống"),
    soDT: yup.string().required("Số điện thoại không được để trống"),
    maLoaiNguoiDung: yup
      .string()
      .required("Mã loại người dùng không được để trống"),
    maNhom: yup.string().required("Mã nhóm không được để trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
  })
  .required();

export default schema;
