import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import coursesSlice from "./slices/courses";
import dashboardSlice from "./slices/danshboard";

const store = configureStore({
  reducer: {
    userSlice,
    coursesSlice,
    dashboardSlice,
  },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

/** Redux only lives in memory
 * - When app is running, Redux stores state in memory.
 * - if refresh the page or navigate in a way that reloads the app, all the Redux state is reset to initialState
 * - Redux does not automatically persist data across page reloads. It’s only for sharing state between components while the app is running.
 */
