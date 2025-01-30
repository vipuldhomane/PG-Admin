import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import AuthService from "@/services/AuthService";
import { AUTH_TOKEN } from "@/config/AppConfig";

export const logInUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(userData);
      localStorage.setItem(AUTH_TOKEN, response.token);
      return response;
    } catch (error) {
      // toast.error("Login failed");
      return rejectWithValue(error.response.data);
    }
  }
);
export const signupUserThunk = createAsyncThunk(
  "auth/signupUserThunk",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AuthService.signup(userData);
      return response;
    } catch (error) {
      // toast.error("Signup failed");
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(logInUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
      })
      .addCase(logInUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Signup
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.signup = action.payload;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
