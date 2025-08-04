import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import logo from "../../../assets/logo-algo.png";
import { Search, Menu, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
const subjects: string[] = ["Data", "Web", "AI", "Design", "Marketing"];

export default function SmallScreen() {
  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="">
              <Menu className="!w-6 !h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {subjects.map((item) => (
              <DropdownMenuItem key={item} asChild>
                <Link to={`/course/${item.toLowerCase()}`}>{item}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <img src={logo} alt="Logo" className="h-15 w-auto" />
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Search className="!w-5 !h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <LogIn className="!w-5 !h-5" />
        </Button>
      </div>
    </>
  );
}
