import { createAsyncThunk } from "@reduxjs/toolkit";

import DashboardService from "./dashboardService";
import { DashboardResponse } from "./dashboardTypes";

/**
 * ==========================================================
 * Load Dashboard
 * ==========================================================
 */

export const loadDashboard = createAsyncThunk<
  DashboardResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "dashboard/loadDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await DashboardService.getDashboard();

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.message ??
          "Failed to load dashboard."
      );
    }
  }
);

/**
 * ==========================================================
 * Refresh Dashboard
 * ==========================================================
 */

export const refreshDashboard = createAsyncThunk<
  DashboardResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "dashboard/refreshDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await DashboardService.getDashboard();

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.message ??
          "Failed to refresh dashboard."
      );
    }
  }
);