import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminReducer from "./slice/adminSlice";
import bookingReducer from "./slice/bookingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      admin: adminReducer,
      booking: bookingReducer,
    },
  });
};
