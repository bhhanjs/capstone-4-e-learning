import { Outlet } from "react-router-dom";
import illustration from "@/assets/illustration.svg";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function AuthLayout() {
  return (
    <div>
      <Header />
      <main className="login my-36">
        <div className="login__container  md:px-5 lg:container lg:mx-auto">
          <div className="login__wrapper grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="login__illustration hidden md:flex  justify-center items-center">
              <img src={illustration} alt="illustration" className="" />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
