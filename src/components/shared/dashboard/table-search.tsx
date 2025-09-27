import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";
import { DASHBOARD_COURSES } from "@/constants/config";
import { setSearchTerm } from "@/store/slices/danshboard";
import { useState } from "react";

type OpenModalProp = {
  onAddClick: () => void;
};

export default function TableSearch({ onAddClick }: OpenModalProp) {
  const dispatch = useAppDispatch();
  const { userInfoUI } = useAppSelector((state) => state.userSlice);
  const { activeContent } = useAppSelector((state) => state.dashboardSlice);
  const [searchValue, setSearchValue] = useState("");

  if (!userInfoUI) return;

  const hoTen = userInfoUI?.hoTen;
  console.log(hoTen);
  const handleChange = function (value: string) {
    setSearchValue(value);
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <Button
          className="bg-algo-bright-sage text-algo-off-white hover:bg-algo-mint-green"
          size="lg"
          onClick={onAddClick}
        >
          {activeContent === DASHBOARD_COURSES
            ? "Thêm khoá học"
            : "Thêm người dùng"}
        </Button>
      </div>

      <div>
        <Input
          type="text"
          placeholder="Searching ..."
          className="h-12 w-md"
          value={searchValue}
          onChange={(event) => {
            const search = event.target.value;
            handleChange(search);
          }}
        />
      </div>
      <div>
        <Avatar>
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              hoTen
            )}&background=fafaf5&color=76b39d`}
            alt={hoTen}
            className="w-12 h-auto rounded-full  border-algo-solf-peach border-2 hover:border-1"
          />
          <AvatarFallback>{hoTen}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
