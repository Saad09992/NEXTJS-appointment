import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadSchedule = createAsyncThunk(
  "admin/uploadSchedule",
  async (data) => {
    try {
      const response = await axios.post("/api/admin/set-schedule", data);
      return response.data;
    } catch (error) {
      console.error("Error uploading schedule:", error);
      return { message: "Error uploading schedule" };
    }
  }
);
