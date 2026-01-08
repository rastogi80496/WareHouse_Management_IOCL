import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";

const initialState = {
  getallStocks: [],
  isgetallStocks: false,
  iscreatedStocks: false,
  searchdata: [],
};

/* ================= CREATE ================= */
export const createStockTransaction = createAsyncThunk(
  "stocktransaction/createStockTransaction",
  async (Stocks, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "stocktransaction/createStockTransaction",
        Stocks,
        { withCredentials: true }
      );
      return response.data.transaction; // ✅ RETURN ONLY TRANSACTION
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Stocks creation failed"
      );
    }
  }
);

/* ================= GET ALL ================= */
export const getAllStockTransactions = createAsyncThunk(
  "stocktransaction/getallStockTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "stocktransaction/getallStockTransaction",
        { withCredentials: true }
      );
      return response.data; // ✅ ARRAY
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Stock retrieval failed"
      );
    }
  }
);

/* ================= SEARCH ================= */
export const searchstockdata = createAsyncThunk(
  "stocktransaction/searchstocks",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `stocktransaction/searchstocks?query=${query}`,
        { withCredentials: true }
      );
      return response.data; // ✅ ARRAY
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Stock search failed"
      );
    }
  }
);

const stocktransactionSlice = createSlice({
  name: "stocktransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ===== GET ALL ===== */
      .addCase(getAllStockTransactions.pending, (state) => {
        state.isgetallStocks = true;
      })
      .addCase(getAllStockTransactions.fulfilled, (state, action) => {
        state.isgetallStocks = false;
        state.getallStocks = action.payload; // ✅ FIXED
      })
      .addCase(getAllStockTransactions.rejected, (state) => {
        state.isgetallStocks = false;
      })

      /* ===== CREATE ===== */
      .addCase(createStockTransaction.pending, (state) => {
        state.iscreatedStocks = true;
      })
      .addCase(createStockTransaction.fulfilled, (state, action) => {
        state.iscreatedStocks = false;
        state.getallStocks.unshift(action.payload); // ✅ FIXED
      })
      .addCase(createStockTransaction.rejected, (state) => {
        state.iscreatedStocks = false;
      })

      /* ===== SEARCH ===== */
      .addCase(searchstockdata.fulfilled, (state, action) => {
        state.searchdata = action.payload;
      });
  },
});

export default stocktransactionSlice.reducer;