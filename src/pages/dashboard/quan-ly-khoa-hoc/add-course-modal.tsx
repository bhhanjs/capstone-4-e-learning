import {
  Dialog,
  DialogContentLarge,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputCustom } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import schema from "./schem-add-course";
import {
  IdCard,
  TagIcon,
  Star,
  UserPen,
  Briefcase,
  BookUser,
  Calendar,
  Telescope,
  FileIcon,
} from "lucide-react";

import "ckeditor5/ckeditor5.css"; // required styles
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Link,
} from "ckeditor5";
import themKhoaHocApi from "@/apis/apiCalls/them-khoa-hoc-api";
import { useAppSelector } from "@/hooks/hook";
import fileToBase64 from "@/utils/fileToBase64";

type OpenAddModal = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export interface FormAddCourse {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}

export default function AddCourseModal({ open, onOpenChange }: OpenAddModal) {
  const { danhMuc } = useAppSelector((state) => state.coursesSlice);
  const { userInfo } = useAppSelector((state) => state.userSlice);
  console.log("danh muc", danhMuc);
  console.log("tai khoan", userInfo?.taiKhoan);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const addCourseMutation = useMutation({
    mutationKey: ["addCourse"],
    mutationFn: (data: FormAddCourse) => themKhoaHocApi(data),
    onSuccess: (response) => {
      console.log("Thêm khóa học thành công:", response);
      reset();
    },
    onError: (error) => {
      console.error("Thêm khóa học thất bại:", error);
    },
  });

  const onSubmit = function (dataForm: FormAddCourse) {
    console.log("form data:", dataForm);
    addCourseMutation.mutate(dataForm);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Modal content */}
      <DialogContentLarge
        className="w-full px-9"
        size="2xl"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">THÊM KHÓA HỌC</DialogTitle>
        </DialogHeader>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          {/* 2 columns layout */}
          <div className="grid grid-cols-2 gap-3">
            <div className="input-group-adding-course">
              <IdCard className="input-adding-course" />
              <Controller
                control={control}
                name="maKhoaHoc"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Mã khoá học"
                    error={errors?.maKhoaHoc?.message}
                  />
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <Briefcase className="input-adding-course" />
              <Controller
                control={control}
                name="tenKhoaHoc"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Tên khoá học"
                    error={errors?.tenKhoaHoc?.message}
                  />
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <TagIcon className="input-adding-course" />
              <Controller
                control={control}
                name="biDanh"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Bí danh"
                    error={errors?.biDanh?.message}
                  />
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <TagIcon className="input-adding-course" />
              <Controller
                control={control}
                name="maDanhMucKhoaHoc"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn danh mục khóa học" />
                    </SelectTrigger>
                    <SelectContent>
                      {danhMuc.map((dm) => (
                        <SelectItem value={dm.maDanhMuc} key={dm.maDanhMuc}>
                          {dm.tenDanhMuc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.maDanhMucKhoaHoc && (
                <p className="text-red-500 text-sm">
                  {errors?.maDanhMucKhoaHoc.message}
                </p>
              )}
            </div>

            <div className="input-group-adding-course">
              <Calendar className="input-adding-course" />
              <Controller
                control={control}
                name="ngayTao"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    type="text"
                    {...field}
                    placeholder="Ngày tạo (dd/mm/yyyy)"
                    error={errors?.ngayTao?.message}
                  />
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <Star className="input-adding-course" />
              <Controller
                control={control}
                name="danhGia"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    type="number"
                    {...field}
                    placeholder="Đánh giá"
                    error={errors?.danhGia?.message}
                  />
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <Telescope className="input-adding-course" />
              <Controller
                control={control}
                name="luotXem"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    type="number"
                    {...field}
                    placeholder="Lượt xem"
                    error={errors?.luotXem?.message}
                  />
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <UserPen className="input-adding-course" />
              <Controller
                control={control}
                name="taiKhoanNguoiTao"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tài khoản người tạo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={userInfo?.taiKhoan as string}>
                        {userInfo?.taiKhoan}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="input-group-adding-course">
              <BookUser className="input-adding-course" />
              <Controller
                control={control}
                name="maNhom"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Mã nhóm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GP01">GP01</SelectItem>
                      <SelectItem value="GP02">GP02</SelectItem>
                      <SelectItem value="GP03">GP03</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.maNhom && (
                <p className="text-red-500 text-sm">{errors?.maNhom.message}</p>
              )}
            </div>

            <div className="col-span-2 input-group-adding-course">
              <FileIcon className="input-adding-course" />
              <Controller
                control={control}
                name="hinhAnh"
                render={({ field, formState: { errors } }) => (
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const base64 = await fileToBase64(file);
                          field.onChange(base64); // set base64 string into form
                        } catch (err) {
                          console.error("Error converting file:", err);
                        }
                      }}
                    />

                    {/* Preview */}
                    {field.value && (
                      <img
                        src={field.value}
                        alt="preview"
                        className="w-20 h-20 object-cover border rounded-md"
                      />
                    )}
                    {errors.hinhAnh && (
                      <p className="text-red-500">{errors.hinhAnh.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Description with React logo */}
          <div className="mt-6">
            <h2 className="py-3 px-5 bg-gray-400 text-algo-off-white mb-5 text-lg font-semibold">
              Mô tả khóa học
            </h2>
            <div className="flex items-start gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className="w-20 h-20"
              />
              <Controller
                control={control}
                name="moTa"
                render={({ field }) => (
                  <div className="flex-1 border rounded-md p-2 ">
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        licenseKey: "GPL",
                        plugins: [Essentials, Paragraph, Bold, Italic, Link],
                        toolbar: ["bold", "italic", "link"],
                        placeholder: "Nhập mô tả...",
                      }}
                      data={field.value || ""}
                      onChange={(_, editor) => field.onChange(editor.getData())}
                    />
                  </div>
                )}
              />
              {errors?.moTa && (
                <p className="text-red-500 text-sm">{errors?.moTa.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="submit"
              className="bg-algo-bright-sage hover:bg-algo-mint-green"
              disabled={!isValid}
            >
              Thêm khóa học
            </Button>
          </div>
        </form>
      </DialogContentLarge>
    </Dialog>
  );
}
