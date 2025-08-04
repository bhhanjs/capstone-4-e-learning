const PATH = {
  HOME: "/",
  DANH_MUC_KHOA_HOC: "/danh-muc-khoa-hoc?maDanhMuc=(maDanhMuc)&maNhom=CPXX",
  CHI_TIET: "/chi-tiet/{maKhoaHoc}",
  TIM_KIEM_KHOA_HOC: "/tim-kiem-khoa-hoc/tenKhoaHoc={}",
  DANG_KY:"/register",
  DANG_NHAP:"/login",
  THONG_TIN_TAI_KHOAN: "thong-tin-tai-khoan",
  KHOA_HOC_CUA_TOI: "khoa-hoc-cua-toi",
  NOT_FOUND: "*"
} as const

export default PATH