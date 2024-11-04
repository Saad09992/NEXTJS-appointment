import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSlots = createAsyncThunk("auth/getSlots", async () => {
  try {
    const response = await axios.get("/api/booking/get-slots");
    return response.data; // Return data on success
  } catch (error) {
    return rejectWithValue(error.response.data); // Return error response on failure
  }
});

export const bookSlot = createAsyncThunk(
  "auth/bookSlot",
  async (bookingData) => {
    try {
      const response = await axios.post("/api/booking/book-slot", bookingData);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error response on failure
    }
  }
);
