import * as yup from "yup";
import type { LoginFormDataType } from "@/constants/pages-constants/auth-constants/type";

const schema: yup.ObjectSchema<LoginFormDataType> = yup
  .object({
    taiKhoan: yup.string().required("Tài khoản không được để trống"),
    matKhau: yup.string().required("Mật khẩu không được để trống"),
  })
  .required();

export default schema;
