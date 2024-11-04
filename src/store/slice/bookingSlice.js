import { createSlice } from "@reduxjs/toolkit";
import { getSlots, bookSlot } from "../method/bookingMethod";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null,
    messege: "",
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlots.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.messege = "Slots Fetched Successfully";
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.messege = action.payload.message;
        state.status = action.payload.status;
      });
  },
});

export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
