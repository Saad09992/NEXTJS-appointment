import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/login", data);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error response on failure
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/signup", data);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error response on failure
    }
  }
);
