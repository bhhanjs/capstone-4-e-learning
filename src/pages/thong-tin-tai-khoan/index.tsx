import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import courseImg from "@/assets/20944332.jpg";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";
import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import huyGhiDanhApi from "@/apis/apiCalls/huy-ghi-danh-api";
import type { DataType } from "@/apis/apiCalls/huy-ghi-danh-api";
import thongTinNguoiDungApi from "@/apis/apiCalls/thong-tin-nguoi-dung-api";
import { setUserInfoUI } from "@/store/slices/user";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export interface KhoaHoc {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}

export default function ThongTinTaiKhoan() {
  const dispatch = useAppDispatch();
  const { userInfoUI: userData } = useAppSelector((state) => state.userSlice);
  const [activeTab, setActiveTab] = useState("info"); // "info" | "courses"
  const [searchTerm, setSearchTerm] = useState("");

  const deleteMutation = useMutation({
    mutationKey: ["delete course"],
    mutationFn: (data: DataType) => huyGhiDanhApi(data),
    onSuccess: async (data) => {
      console.log("success delete:", data);
      try {
        const updateUserInfoUI = await thongTinNguoiDungApi();
        dispatch(setUserInfoUI(updateUserInfoUI));
        toast.success("Đã xoá thành công");
      } catch (error) {
        console.log("error of fetch user info ui:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.log("error delete:", error);
      throw error;
    },
  });

  if (!userData) return null;

  // filter courses by search term
  const filteredCourses = userData.chiTietKhoaHocGhiDanh.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (data: DataType) => {
    // You can connect API here
    console.log("Delete course:", data);
    deleteMutation.mutate(data);
  };

  return (
    <div className="container mx-auto py-20 space-y-6">
      {/* Top Buttons */}
      <div className="flex gap-4 ">
        <Button
          variant={activeTab === "info" ? "default" : "outline"}
          onClick={() => setActiveTab("info")}
        >
          Thông tin người dùng
        </Button>
        <Button
          variant={activeTab === "courses" ? "default" : "outline"}
          onClick={() => setActiveTab("courses")}
        >
          Danh sách khóa học
        </Button>
      </div>

      {/* Big Card */}
      <Card className="">
        {activeTab === "info" && (
          <CardContent className="space-y-6 p-6">
            <div className="w-full flex gap-6">
              {/* Profile Card */}
              <Card className="flex items-center justify-center gap-3 p-4 flex-1/3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      userData.hoTen
                    )}&background=random`}
                    alt={userData.hoTen}
                    className="w-36 h-auto rounded-full"
                  />
                  <AvatarFallback>{userData.hoTen[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-algo-charcoal">
                    {userData.hoTen}
                  </h2>
                  <p className="text-gray-500">{userData.email}</p>
                  <Badge
                    variant="secondary"
                    className={
                      userData.maLoaiNguoiDung === "HV"
                        ? "bg-algo-bright-sage"
                        : "bg-algo-solf-peach"
                    }
                  >
                    {userData.maLoaiNguoiDung}
                  </Badge>
                </div>
              </Card>

              {/* Contact Info */}
              <Card className="flex-2/3">
                <CardHeader>
                  <CardTitle className="text-algo-charcoal">
                    Thông tin liên hệ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tài khoản:</span>
                    <span className="font-medium">{userData.taiKhoan}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-500">Số điện thoại:</span>
                    <span className="font-medium">{userData.soDT}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nhóm:</span>
                    <span className="font-medium">{userData.maNhom}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        )}

        {activeTab === "courses" && (
          <CardContent className="space-y-9 p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-algo-charcoal">
                Khóa học của bạn
              </CardTitle>
              <Input
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(event.target.value)
                }
                className="w-sm md:w-lg"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ảnh</TableHead>
                  <TableHead>Tên khóa học</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 && (
                  <div className="py-5 text-[16px]">
                    Không tìm thấy kết quả nào!
                  </div>
                )}
                {filteredCourses.map((course) => (
                  <TableRow key={course.maKhoaHoc}>
                    <TableCell>
                      <img
                        src={courseImg}
                        alt="hinh anh khoa hoc"
                        className="w-20 h-auto"
                      />
                    </TableCell>
                    <TableCell>{course.tenKhoaHoc}</TableCell>
                    <TableCell>{course.moTa}</TableCell>
                    <TableCell>
                      {new Date(course.ngayTao).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>{course.luotXem}</TableCell>
                    <TableCell>
                      {"⭐".repeat(Math.min(course.danhGia, 5))}{" "}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDelete({
                            maKhoaHoc: course.maKhoaHoc,
                            taiKhoan: userData.taiKhoan,
                          })
                        }
                        className="hover:bg-red-500"
                      >
                        Hủy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
      <Toaster />
    </div>
  );
}

// chiTietKhoaHocGhiDanh
