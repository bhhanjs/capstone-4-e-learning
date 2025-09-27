import {
  Dialog,
  DialogContent,
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
import {
  User,
  Users,
  Mail,
  Lock,
  Phone,
  Briefcase,
  BookUser,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import schema from "./schem-add-user";
import themNguoiDungApi from "@/apis/apiCalls/them-nguoi-dung-api";
import { useState } from "react";
import SuccessModal from "@/components/shared/dashboard/sucess-modal";

type OpenAddModal = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export interface FormAddUser {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export default function AddUserModal({ open, onOpenChange }: OpenAddModal) {
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm<FormAddUser>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "",
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const addUserMutation = useMutation({
    mutationFn: (data: FormAddUser) => themNguoiDungApi(data),
    onSuccess: (response) => {
      console.log(response);
      setSuccessOpen(true);
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      console.log(error);
      throw error;
    },
  });

  const onSubmit = function (formData: FormAddUser) {
    console.log(formData);
    addUserMutation.mutate(formData);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-md rounded-2xl"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              THÔNG TIN NGƯỜI DÙNG
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Tài khoản */}
            <div className="input-group-adding-user">
              <User className="input-adding-user" />
              <Controller
                control={control}
                name="taiKhoan"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Tài khoản"
                    error={errors?.taiKhoan?.message}
                  />
                )}
              />
            </div>

            {/* Họ và tên */}
            <div className="input-group-adding-user">
              <BookUser className="input-adding-user" />
              <Controller
                control={control}
                name="hoTen"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Họ và tên"
                    error={errors?.hoTen?.message}
                  />
                )}
              />
            </div>

            {/* Email */}
            <div className="input-group-adding-user">
              <Mail className="input-adding-user" />
              <Controller
                control={control}
                name="email"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Email"
                    error={errors?.email?.message}
                  />
                )}
              />
            </div>

            {/* Mật khẩu */}
            <div className="input-group-adding-user">
              <Lock className="input-adding-user" />
              <Controller
                control={control}
                name="matKhau"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Mật khẩu"
                    error={errors?.matKhau?.message}
                  />
                )}
              />
            </div>

            {/* Số điện thoại */}
            <div className="input-group-adding-user">
              <Phone className="input-adding-user" />
              <Controller
                control={control}
                name="soDT"
                render={({ field, formState: { errors } }) => (
                  <InputCustom
                    {...field}
                    placeholder="Số điện thoại"
                    error={errors?.soDT?.message}
                  />
                )}
              />
            </div>

            {/* Loại người dùng */}
            <div className="input-group-adding-user">
              <Briefcase className="input-adding-user" />
              <Controller
                control={control}
                name="maLoaiNguoiDung"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Loại người dùng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HV">Học viên</SelectItem>
                      <SelectItem value="GV">Giáo vụ</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.maLoaiNguoiDung && (
                <p className="text-red-500 text-sm">
                  {errors?.maLoaiNguoiDung.message}
                </p>
              )}
            </div>

            {/* Mã Nhóm */}
            <div className="input-group-adding-user">
              <Users className="input-adding-user" />
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
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.maNhom && (
                <p className="text-red-500 text-sm">{errors?.maNhom.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-9">
              <Button
                type="submit"
                className="bg-algo-bright-sage hover:bg-algo-mint-green"
                disabled={!isValid}
              >
                Thêm người dùng
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal open={successOpen} onOpenChange={setSuccessOpen} />
    </>
  );
}
