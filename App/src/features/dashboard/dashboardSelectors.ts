import { RootState } from "../../app/store";

/**
 * ==========================================================
 * Dashboard Selectors
 * ==========================================================
 */

export const selectDashboard = (
  state: RootState
) => state.dashboard;

export const selectDashboardLoading = (
  state: RootState
) => state.dashboard.loading;

export const selectDashboardTitle = (
  state: RootState
) => state.dashboard.dashboardTitle;

export const selectDashboardCards = (
  state: RootState
) => state.dashboard.cards;

export const selectDashboardMenus = (
  state: RootState
) => state.dashboard.menus;

export const selectDashboardError = (
  state: RootState
) => state.dashboard.error;