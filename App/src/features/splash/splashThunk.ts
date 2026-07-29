import { createAsyncThunk } from "@reduxjs/toolkit";

import SplashService from "./splashService";
import { InitializeAppResponse } from "./splashTypes";

/**
 * ==========================================================
 * Initialize Application
 * ==========================================================
 */
export const initializeApp = createAsyncThunk<
  InitializeAppResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "splash/initializeApp",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await SplashService.initialize();

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.message ??
          "Failed to initialize application."
      );
    }
  }
);

/**
 * ==========================================================
 * Logout
 * ==========================================================
 */
export const logout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>(
  "splash/logout",
  async (_, { rejectWithValue }) => {
    try {
      await SplashService.logout();
    } catch (error: any) {
      return rejectWithValue(
        error?.message ??
          "Logout failed."
      );
    }
  }
);