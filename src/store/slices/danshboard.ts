import { createSlice } from "@reduxjs/toolkit";
import { DASHBOARD_USERS } from "@/constants/config";
import type { UserListResponse } from "@/apis/apiCalls/danh-sach-nguoi-dung-api";
import type { KhoaHoc } from "@/apis/apiCalls/danh-sach-khoa-hoc-api";


export interface DashboardState {
  activeContent: string;
  userList: UserListResponse | [];
  searchTerm: string;
  courseList: KhoaHoc[];
}

const initialState = {
  activeContent: DASHBOARD_USERS,
  userList: [],
  searchTerm: "",
  courseList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActiveContent: (state, action) => {
      state.activeContent = action.payload;
    },

    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setCourseList: (state, action) => {
      state.courseList = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setActiveContent, setUserList, setSearchTerm, setCourseList } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
