import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { loginUser } from "./authThunk";
import { User } from "./authTypes";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },

    setToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.token = action.payload;
    },

    setUser: (
      state,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN PENDING
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      // LOGIN FAILED
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ?? "Login Failed";

        state.isAuthenticated = false;
      });
  },
});

export const {
  clearError,
  clearAuth,
  setToken,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;