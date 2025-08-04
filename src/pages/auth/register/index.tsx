import PATH from "@/routes/path";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { InputCustom } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema-register";
import { useMutation } from "@tanstack/react-query";
import registerAPI from "@/apis/apiCalls/register-api";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface RegisterFormDataType {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

export default function Register() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<RegisterFormDataType>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "",
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormDataType) => {
      return registerAPI(data);
    },
    onSuccess: () => {
      console.log("tanstack register: success");
      toast.success("Register successful!");
      navigate(PATH.DANG_NHAP);
      reset();
    },
    onError: (error) => {
      console.log("tanstack register: error: ", error);
      toast.error("Register failed. Please try again.");
    },
  });

  const onSubmit = function (formData: RegisterFormDataType) {
    console.log("register formData:", formData);
    registerMutation.mutate(formData);
  };

  return (
    <div>
      <Toaster position="top-right" offset={70} />
      <div className="login__content px-20 sm:w-8/12 sm:mx-auto sm:px-10 md:px-0 md:w-10/12 md:mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center text-algo-charcoal mb-">
          Log in to continue your <br />
          learning journey
        </h2>
        <div>
          <form
            className="login__form space-y-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="login__form__group">
                <Controller
                  control={control}
                  name="taiKhoan"
                  render={({ field, formState: { errors } }) => (
                    <InputCustom
                      {...field}
                      error={errors.taiKhoan?.message}
                      placeholder="Account"
                      className="input"
                    />
                  )}
                />
              </div>
              <div className="login__form__group">
                <Controller
                  control={control}
                  name="matKhau"
                  render={({ field, formState: { errors } }) => (
                    <InputCustom
                      {...field}
                      placeholder="Password"
                      error={errors.matKhau?.message}
                      className="input"
                    />
                  )}
                />
              </div>
              <div className="login__form__group">
                <Controller
                  control={control}
                  name="hoTen"
                  render={({ field, formState: { errors } }) => (
                    <InputCustom
                      {...field}
                      placeholder="Name"
                      error={errors.hoTen?.message}
                      className="input"
                    />
                  )}
                />
              </div>
              <div className="login__form__group">
                <Controller
                  control={control}
                  name="soDT"
                  render={({ field, formState: { errors } }) => (
                    <InputCustom
                      {...field}
                      placeholder="Phone"
                      error={errors.soDT?.message}
                      className="input"
                    />
                  )}
                />
              </div>
              <div className="login__form__group">
                <Controller
                  control={control}
                  name="email"
                  render={({ field, formState: { errors } }) => (
                    <InputCustom
                      {...field}
                      placeholder="Email"
                      error={errors.email?.message}
                      className="input"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="maNhom"
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="input w-full !h-[60px]">
                        <SelectValue placeholder="Classify" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GP01">GP01</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.maNhom && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.maNhom?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button type="submit" disabled={!isValid} className="button">
                Sign up
              </Button>
            </div>

            <Separator className="w-full h-1 my-12" />

            <div className="flex justify-center items-center gap-1">
              <p>Already have an account?</p>
              <Link
                to={PATH.DANG_NHAP}
                className="text-algo-bright-sage font-bold text-lg underline underline-offset-4 hover:text-algo-mint-green"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
