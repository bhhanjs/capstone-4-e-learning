import { useEffect, ChangeEvent, KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import logo from "../../../assets/logo-algo.png";
import PATH from "@/routes/path";
import danhMucAPI from "@/apis/apiCalls/danh-muc-api";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setDanhMuc, setSearchKey } from "@/store/slices/courses";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import devLog from "@/utils/loggerFn";

interface DanhMuc {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export default function MediumScreen() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { danhMuc } = useAppSelector((state) => state.coursesSlice);

  const { data, isLoading, isError } = useQuery<DanhMuc[]>({
    queryKey: ["danhMuc"],
    queryFn: danhMucAPI,
  });

  devLog("data:", data);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setDanhMuc(data));
    }
  }, [data, dispatch, isLoading]);

  const handleSearchChange = function (value: string) {
    setSearchValue(value);
  };

  const handleSearchKeyDown = function (
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      dispatch(setSearchKey(searchValue));
      navigate(PATH.TIM_KIEM_KHOA_HOC);
    }
  };

  return (
    <>
      {isError && <div>Error loading categories</div>}
      {isLoading && <Skeleton className="w-full h-12" />}
      {!isLoading && danhMuc.length !== 0 && (
        <>
          <div className="flex items-center gap-1.5">
            <Link to={PATH.HOME} aria-label="Go to home page">
              <img src={logo} alt="Logo" className="h-[60px] w-auto" />
            </Link>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-[16px] font-light hover:border-0 hover:text-algo-off-white hover:bg-algo-mint-green"
                    aria-label="Explore categories"
                  >
                    Explore
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="px-3 space-y-4 ">
                  {danhMuc.map((item) => (
                    <DropdownMenuItem key={item.maDanhMuc} asChild>
                      <Link
                        to={PATH.DANH_MUC_THEO_DANH_MUC.replace(
                          ":maDanhMuc",
                          item.maDanhMuc
                        )}
                        className="flex justify-between items-center gap-7"
                        aria-label={`Go to ${item.tenDanhMuc}`}
                      >
                        {item.tenDanhMuc} <ChevronRight />
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-6">
            <Input
              type="text"
              placeholder="Search for everything..."
              className="h-12"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(event.target.value)
              }
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <div className="flex gap-2">
            <Button className="button-border">
              <Link to={PATH.DANG_NHAP} aria-label="Go to login page">
                Login
              </Link>
            </Button>
            <Button className="button-filled">
              <Link to={PATH.DANG_KY} aria-label="Go to register page">
                Register
              </Link>
            </Button>
          </div>
        </>
      )}
    </>
  );
}
