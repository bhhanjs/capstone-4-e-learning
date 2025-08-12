const PATH = {
  HOME: "/",
  KHOA_HOC_THEO_DANH_MUC: "/khoa-hoc-theo-danh-muc/:maDanhMuc",
  CHI_TIET: "/chi-tiet/:maKhoaHoc",
  TIM_KIEM_KHOA_HOC: "/tim-kiem-khoa-hoc",
  DANG_KY: "/register",
  DANG_NHAP: "/login",
  THONG_TIN_TAI_KHOAN: "thong-tin-tai-khoan",
  KHOA_HOC_CUA_TOI: "khoa-hoc-cua-toi",
  NOT_FOUND: "*",
} as const;

export default PATH;
