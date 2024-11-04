import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../method/authMethod";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    uid: null,
    message: "",
    token: null,
    isAuthecticated: false,
  },
  reducers: {
    setTokenandUid: (state, action) => {
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.isAuthecticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.message = "Login Successfully";
        state.token = action.payload.token;
        state.isAuthecticated = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = "Signup Successfully";
      });
  },
});

export const { logout, setTokenandUid } = authSlice.actions;
export default authSlice.reducer;
