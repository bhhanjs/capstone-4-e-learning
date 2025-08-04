import * as yup from "yup";
import type { RegisterFormDataType } from "@/constants/pages-constants/auth-constants/type";

const PHONE_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~]).{8,}$/;

const schema: yup.ObjectSchema<RegisterFormDataType> = yup
  .object({
    taiKhoan: yup.string().required("Tài khoản không được để trống"),
    matKhau: yup
      .string()
      .required("Mật khẩu không được để trống")
      .matches(
        PASSWORD_REGEX,
        "Password must contain at least 8 characters ( 1 uppercase, 1 special character)"
      ),
    hoTen: yup.string().required("Họ tên không được để trống"),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    soDT: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(PHONE_REGEX, "Số điện thoại không hợp lệ"),
    maNhom: yup.string().required("Mã nhóm không được để trống"),
  })
  .required();

export default schema;
