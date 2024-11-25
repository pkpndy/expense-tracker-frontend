import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import { pathForUserExpensesApis } from "../api/expenseTracker.api";

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (filters) => {
    const response = await api.post(pathForUserExpensesApis.getExpenses, filters);
    return response.data;
  }
);

export const fetchFilteredExpenses = createAsyncThunk(
  "expense/fetchFilteredExpenses",
  async (filters) => {
      const queryString = Object.keys(filters)
          .filter((key) => filters[key]) // Ignore empty values
          .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
          .join("&");

      const response = await api.get(`/api/expenses?${queryString}`);
      return response.data;
  }
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { dispatch }) => {
    const response = await api.post(pathForUserExpensesApis.addExpense, expenseData);
    dispatch(fetchExpenses()); // Refresh expenses after addition
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async (expenseData, { dispatch }) => {
    const response = await api.patch(pathForUserExpensesApis.updateExpense, expenseData);
    dispatch(fetchExpenses()); // Refresh expenses after update
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId, { dispatch }) => {
    await api.delete(`${pathForUserExpensesApis.deleteExpense}/${expenseId}`);
    dispatch(fetchExpenses()); // Refresh expenses after deletion
    return expenseId;
  }
);

export const fetchExpenseLimit = createAsyncThunk(
  "expense/fetchExpenseLimit",
  async () => {
    const response = await api.get(pathForUserExpensesApis.getExpenseLimit);
    return response.data;
  }
);

export const updateExpenseLimit = createAsyncThunk(
  "expense/updateExpenseLimit",
  async (newLimit, { dispatch }) => {
    const response = await api.patch(pathForUserExpensesApis.updateExpenseLimit, {
      limit: newLimit,
    });
    dispatch(fetchExpenseLimit()); // Refresh limit after update
    return response.data;
  }
);

export const fetchAnalytics = createAsyncThunk(
  "expense/fetchAnalytics",
  async () => {
    const response = await api.get(pathForUserExpensesApis.getExpenseAnalytics);
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
    totalAmount: 0,
    monthlyLimit: 0,
    limitWarning: false,
    analytics: {
      categorySummary: [],
      monthlySummary: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
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
        state.totalAmount = action.payload.reduce((sum, expense) => sum + expense.amount, 0);
        state.limitWarning = state.totalAmount >= state.monthlyLimit;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchExpenseLimit.fulfilled, (state, action) => {
        state.monthlyLimit = action.payload;
        state.limitWarning = state.totalAmount >= state.monthlyLimit;
      })
      .addCase(updateExpenseLimit.fulfilled, (state, action) => {
        state.monthlyLimit = action.payload.limit;
        state.limitWarning = state.totalAmount >= state.monthlyLimit;
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.analytics = {
          categorySummary: action.payload.categorySummary,
          monthlySummary: action.payload.monthlySummary,
        };
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const { setFilters, clearFilters } = expenseSlice.actions;
export default expenseSlice.reducer;
