import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import travelSlice from "./travelSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    travel: travelSlice
  },
});
