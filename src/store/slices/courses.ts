import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DanhMuc } from "@/apis/apiCalls/danh-muc-api";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";

interface CoursesState {
  danhMuc: DanhMuc[];
  khoaHoc: KhoaHoc[];
}

const initialState: CoursesState = {
  danhMuc: [],
  khoaHoc: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setDanhMuc: (state, action: PayloadAction<DanhMuc[]>) => {
      state.danhMuc = action.payload;
    },
    setKhoaHoc: (state, action: PayloadAction<KhoaHoc[]>) => {
      state.khoaHoc = action.payload;
    },
  },
});

export const { setDanhMuc, setKhoaHoc } = coursesSlice.actions;
export default coursesSlice.reducer;
