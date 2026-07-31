import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  DashboardState,
  DashboardResponse,
} from "./dashboardTypes";

import {
  loadDashboard,
  refreshDashboard,
} from "./dashboardThunk";

const initialState: DashboardState = {
  loading: false,
  dashboardTitle: "",
  cards: [],
  menus: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboard: state => {
      state.dashboardTitle = "";
      state.cards = [];
      state.menus = [];
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder

      /**
       * ===========================================
       * Load Dashboard
       * ===========================================
       */
      .addCase(loadDashboard.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loadDashboard.fulfilled,
        (
          state,
          action: PayloadAction<DashboardResponse>
        ) => {
          state.loading = false;
          state.dashboardTitle =
            action.payload.dashboardTitle;
          state.cards = action.payload.cards;
          state.menus = action.payload.menus;
          state.error = null;
        }
      )

      .addCase(
        loadDashboard.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            "Failed to load dashboard.";
        }
      )

      /**
       * ===========================================
       * Refresh Dashboard
       * ===========================================
       */
      .addCase(refreshDashboard.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        refreshDashboard.fulfilled,
        (
          state,
          action: PayloadAction<DashboardResponse>
        ) => {
          state.loading = false;
          state.dashboardTitle =
            action.payload.dashboardTitle;
          state.cards = action.payload.cards;
          state.menus = action.payload.menus;
          state.error = null;
        }
      )

      .addCase(
        refreshDashboard.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            "Failed to refresh dashboard.";
        }
      );
  },
});

export const {
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;