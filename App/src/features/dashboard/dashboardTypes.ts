/**
 * ==========================================================
 * Dashboard Card
 * ==========================================================
 */

export interface DashboardCard {
  id: number;
  title: string;
  value: string;
  icon?: string;
  color?: string;
}

/**
 * ==========================================================
 * Dashboard Menu
 * ==========================================================
 */

export interface DashboardMenu {
  id: number;
  title: string;
  icon?: string;
}

/**
 * ==========================================================
 * Dashboard State
 * ==========================================================
 */

export interface DashboardState {
  loading: boolean;
  dashboardTitle: string;
  cards: DashboardCard[];
  menus: DashboardMenu[];
  error: string | null;
}

/**
 * ==========================================================
 * Initialize Dashboard Response
 * ==========================================================
 */

export interface DashboardResponse {
  dashboardTitle: string;
  cards: DashboardCard[];
  menus: DashboardMenu[];
}