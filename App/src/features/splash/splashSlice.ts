import { createSlice } from "@reduxjs/toolkit";

import { initializeApp } from "./splashThunk";

export interface SplashState {
  loading: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
  error: string | null;
}

const initialState: SplashState = {
  loading: false,
  initialized: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

const splashSlice = createSlice({
  name: "splash",
  initialState,
  reducers: {
    resetSplashState: (state) => {
      state.loading = false;
      state.initialized = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // initializeApp Pending
      .addCase(initializeApp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // initializeApp Success
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
      })

      // initializeApp Failed
      .addCase(initializeApp.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error =
          action.payload as string ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const {
  resetSplashState,
} = splashSlice.actions;

export default splashSlice.reducer;