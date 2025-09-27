import * as yup from "yup";
import type { FormAddCourse } from "./add-course-modal";

const schema: yup.ObjectSchema<FormAddCourse> = yup
  .object()
  .shape({
    maKhoaHoc: yup.string().required("Mã khóa học là bắt buộc"),
    biDanh: yup.string().required("Bí danh là bắt buộc"),
    tenKhoaHoc: yup.string().required("Tên khóa học là bắt buộc"),
    moTa: yup
      .string()
      .transform((value) => {
        if (!value) return "";
        return value.replace(/<[^>]+>/g, ""); // remove HTML tags
      })
      .required("Mô tả là bắt buộc")
      .max(50, "Chỉ được nhập tối đa 50 ký tự"),
    luotXem: yup
      .number()
      .transform((_, originalValue) => {
        // If the value is empty string, treat it as 0
        if (originalValue === "") return 0;
        return Number(originalValue);
      })
      .required("Lượt xem là bắt buộc")
      .min(1, "Lượt xem không hợp lệ"),

    danhGia: yup
      .number()
      .transform((_, originalValue) => {
        if (originalValue === "") return 0;
        return Number(originalValue);
      })
      .required("Đánh giá là bắt buộc")
      .min(1)
      .max(5),
    hinhAnh: yup
      .string()
      .nullable()
      .required("Hình ảnh là bắt buộc")
      .test("is-base64", "Hình ảnh không hợp lệ", (value) =>
        value ? value.startsWith("data:image") : false
      ),
    maNhom: yup.string().required("Mã nhóm là bắt buộc"),
    ngayTao: yup
      .string()
      .required("Ngày tạo là bắt buộc")
      .matches(
        /^\d{1,2}\/\d{1,2}\/\d{4}$/,
        "Ngày tạo phải theo định dạng dd/mm/yyyy"
      ),
    maDanhMucKhoaHoc: yup.string().required("Mã danh mục khóa học là bắt buộc"),
    taiKhoanNguoiTao: yup.string().required("Tài khoản người tạo là bắt buộc"),
  })
  .required();

export default schema;
