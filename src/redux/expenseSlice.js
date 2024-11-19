import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pathForUserExpensesApis } from "../api/expenseTracker.api";

// Thunks for API calls
export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (filters, { getState }) => {
    const { userId } = getState().user; // Assuming user data is stored in state
    const response = await axios.post(pathForUserExpensesApis.getExpenses, { userId, ...filters });
    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { dispatch }) => {
    const response = await axios.post(pathForUserExpensesApis.addExpense, expenseData);
    dispatch(fetchExpenses()); // Reload expenses after adding
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async (expenseData, { dispatch }) => {
    const response = await axios.patch(pathForUserExpensesApis.updateExpense, expenseData);
    dispatch(fetchExpenses()); // Reload expenses after updating
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id, { dispatch }) => {
    await axios.delete(pathForUserExpensesApis.deleteExpense);
    dispatch(fetchExpenses()); // Reload expenses after deletion
    return id;
  }
);

export const fetchAnalytics = createAsyncThunk(
  "expense/fetchAnalytics",
  async (_, { getState }) => {
    const { userId } = getState().user;
    const response = await axios.get("/api/analytics", { params: { userId } });
    return response.data;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    filters: {
      category: null,
      startDate: null,
      endDate: null,
      minAmount: null,
      maxAmount: null,
    },
    analytics: {
      categorySummary: [],
      monthlySummary: [],
    },
    monthlyLimit: 0,
    limitWarning: false,
    status: "idle",
    error: null,
  },
  reducers: {
    setMonthlyLimit: (state, action) => {
      state.monthlyLimit = action.payload;
      // Calculate limit warning
      const totalAmount = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      state.limitWarning = totalAmount >= state.monthlyLimit;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        startDate: null,
        endDate: null,
        minAmount: null,
        maxAmount: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = action.payload;
        const totalAmount = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        state.limitWarning = totalAmount >= state.monthlyLimit;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { setMonthlyLimit, setFilters, clearFilters } = expenseSlice.actions;
export default expenseSlice.reducer;
