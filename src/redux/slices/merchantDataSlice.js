import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ViewService from "@/services/ViewService";

export const getAllMerchantDetailsThunk = createAsyncThunk(
  "merchant/getAllMerchantDetails",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ViewService.getAllMerchantDetails();

      return response;
    } catch (error) {
      // toast.error("Login failed");
      return rejectWithValue(error.response.data);
    }
  }
);

const merchantDataSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    loading: false,
    error: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(getAllMerchantDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMerchantDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllMerchantDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default merchantDataSlice.reducer;
