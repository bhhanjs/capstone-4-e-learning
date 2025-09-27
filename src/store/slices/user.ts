import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_USER } from "@/constants/config";
import type { UserInfoUI } from "@/apis/apiCalls/thong-tin-nguoi-dung-api";

export interface UserInfo {
  taiKhoan: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
  accessToken: string;
}

interface UserState {
  userInfo: UserInfo | null;
  userInfoUI: UserInfoUI | null;
  isLogin: boolean;
}

// const initialState: UserState = {
//   userInfo: JSON.parse(localStorage.getItem(LOCAL_USER) || "null") as UserInfo || null,
// };

const getLocalstorage = function (): UserInfo | null {
  try {
    const stored = localStorage.getItem(LOCAL_USER);
    if (!stored) return null;

    const parse = JSON.parse(stored);

    if (
      typeof parse.taiKhoan === "string" &&
      typeof parse.email === "string" &&
      typeof parse.soDT === "string" &&
      typeof parse.maNhom === "string" &&
      typeof parse.maLoaiNguoiDung === "string" &&
      typeof parse.hoTen === "string" &&
      typeof parse.accessToken === "string"
    ) {
      return parse;
    }
    return null;
  } catch (error) {
    console.log("error getItem localStorage:", error);
    return null;
  }
};

const initialState: UserState = {
  userInfo: getLocalstorage(),
  userInfoUI: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem(LOCAL_USER, JSON.stringify(action.payload));
    },
    setUserInfoUI: (state, action: PayloadAction<UserInfoUI>) => {
      state.userInfoUI = action.payload;
    },
    setIsLogin: (state) => {
      state.isLogin = true;
    },
    setLogOut: (state) => {
      localStorage.removeItem(LOCAL_USER);
      state.userInfo = null;
      state.userInfoUI = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, setUserInfoUI, setIsLogin, setLogOut } = userSlice.actions;
export default userSlice.reducer;

/**   userInfo: JSON.parse(localStorage.getItem(localUser.user)) || underfined,
 * + localStorage.getItem() => this will return a string | null (is there is no user in the localstorage yet)
 * + but the JSON.parse only expect the string, not the null
 * + So typescript want use to handle the null case safely
 *
 * solution note: there is the different betwen JSON.parse take a raw null and a string " null"
 *
 */
