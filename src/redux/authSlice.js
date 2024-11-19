import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import { pathForUserAuthApis } from '../api/expenseTracker.api';

export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post(pathForUserAuthApis.signup, userData);
    return response.data; 
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post(pathForUserAuthApis.login, credentials);
    localStorage.setItem('jwt', response.data.token);
    return response.data; 
  } catch (err) {
    console.log(err)
    return rejectWithValue(err.response.data); 
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('jwt');
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        state.user = { token };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
