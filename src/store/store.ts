import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import coursesSlice from "./slices/courses";

const store = configureStore({
  reducer: {
    userSlice,
    coursesSlice,
  },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
