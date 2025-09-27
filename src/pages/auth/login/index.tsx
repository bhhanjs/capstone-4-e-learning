import { Button } from "@/components/ui/button";
import { InputCustom } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PATH from "@/routes/path";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schem-login";
import loginAPI from "@/apis/apiCalls/login-api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import thongTinNguoiDungApi from "@/apis/apiCalls/thong-tin-nguoi-dung-api";
import { setUserInfoUI, setIsLogin } from "@/store/slices/user";

interface LoginFormDataType {
  taiKhoan: string;
  matKhau: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // hook form 
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<LoginFormDataType>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  

  const userInfoMutation = useMutation({
    mutationFn: () => {
      return thongTinNguoiDungApi();
    },
    onSuccess: (data) => {
      console.log("data:", data);
      dispatch(setUserInfoUI(data));
      dispatch(setIsLogin());
      navigate(PATH.HOME);
    },

    onError: (error) => {
      console.log("error:", error);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormDataType) => {
      return loginAPI(data);
    },
    onSuccess: (response) => {
      console.log("tanstack login response:", response);
      toast.success("Login successful!");
      userInfoMutation.mutate();
      dispatch(setUser(response));
      reset();
    },
    onError: (error) => {
      console.log("login error api:", error);
      toast.error("Login failed. Please try again.");
    },
  });

  const onSubmit = function (formData: LoginFormDataType) {
    console.log("login form data:", formData);
    loginMutation.mutate(formData);
  };

  return (
    <div>
      <div className="login__content px-20 sm:w-8/12 sm:mx-auto sm:px-10 md:px-0 md:w-10/12 md:mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center text-algo-charcoal mb-">
          Log in to continue your <br />
          learning journey
        </h2>
        <div>
          <form
            className="login__form space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div>
              <Button type="submit" disabled={!isValid} className="button">
                Login
              </Button>
            </div>

            <Separator className="w-full h-1 my-12" />
            <div className="flex justify-center items-center gap-1">
              <p>Don't have an account ?</p>
              <Link
                to={PATH.DANG_KY}
                className="text-algo-bright-sage font-bold text-lg underline underline-offset-4 hover:text-algo-mint-green"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
