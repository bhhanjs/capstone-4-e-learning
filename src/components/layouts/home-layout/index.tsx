import { Outlet } from "react-router-dom";
import Header from "../../shared/header";
import Footer from "@/components/shared/footer";

export default function HomeLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

// this is component that return JSX element
