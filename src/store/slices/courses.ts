import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DanhMuc } from "@/apis/apiCalls/danh-muc-api";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";

interface CoursesState {
  danhMuc: DanhMuc[];
  top8KhoaHoc: KhoaHoc[];
  searchKey: string
}

const initialState: CoursesState = {
  danhMuc: [],
  top8KhoaHoc: [],
  searchKey: ""
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setDanhMuc: (state, action: PayloadAction<DanhMuc[]>) => {
      state.danhMuc = action.payload;
    },
    setTop8KhoaHoc: (state, action: PayloadAction<KhoaHoc[]>) => {
      state.top8KhoaHoc = action.payload;
    },
    setSearchKey: (state, action)=>{
      state.searchKey = action.payload
    }
  },
});

export const { setDanhMuc, setTop8KhoaHoc, setSearchKey } = coursesSlice.actions;
export default coursesSlice.reducer;
