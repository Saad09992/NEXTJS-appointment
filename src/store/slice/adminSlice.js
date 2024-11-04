import { createSlice } from "@reduxjs/toolkit";
import { uploadSchedule } from "@/store/method/adminMethod";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminData: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadSchedule.fulfilled, (state, action) => {
        state.adminData = action.payload.schedule;
        state.message = "Schedule uploaded successfully";
      })
      .addCase(uploadSchedule.rejected, (state, action) => {
        state.message = "Error uploading schedule";
      });
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
