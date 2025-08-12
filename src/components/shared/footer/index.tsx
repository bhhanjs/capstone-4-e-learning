import logo from "@/assets/logo-algo.png";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import PATH from "@/routes/path";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="header__container md:container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-4 pt-3 pb-7">
          {/* col 1 */}
          <div className="sm:col-span-4 md:col-span-1 flex gap-5 md:block">
            <img src={logo} alt="Logo" className="h-15 w-auto" />
            <p className="text-gray-600 mt-2">
              Empowering you to learn anywhere, <br /> anytime. To build
              in-demand career skills.
            </p>
          </div>

          {/* col 2 */}
          <div>
            <h3 className="font-semibold text-gray-700">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>
                <Link to={PATH.HOME} className="footer__link-page">
                  Home
                </Link>
              </li>
              <li>
                <Link to={PATH.KHOA_HOC_THEO_DANH_MUC} className="footer__link-page">
                  Course
                </Link>
              </li>
              <li>
                <Link
                  to={PATH.THONG_TIN_TAI_KHOAN}
                  className="footer__link-page"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link to="#" className="footer__link-page">
                  About us
                </Link>
              </li>
              <li>
                <Link to="#" className="footer__link-page">
                  Help and Support
                </Link>
              </li>
            </ul>
          </div>

          {/* col 3 */}
          <div>
            <h3 className="font-semibold text-gray-700">
              Legal & Accessibility
            </h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>
                <Link to="#" className="footer__link-page">
                  Accessibility statement
                </Link>
              </li>
              <li>
                <Link to="#" className="footer__link-page">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="#" className="footer__link-page">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="#" className="footer__link-page">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* col4 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Follow Us</h3>
            <div className="flex space-x-6 mt-2 text-gray-600">
              <Link to="#">
                <FacebookIcon className="footer__link-social" />
              </Link>
              <Link to="#">
                <TwitterIcon className="footer__link-social" />
              </Link>
              <Link to="#">
                <InstagramIcon className="footer__link-social" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-sm text-gray-500">
          &copy; 2025 AlgoAcademy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
