import {
  DashboardCard,
  DashboardMenu,
  DashboardResponse,
} from "../dashboardTypes";

/**
 * ==========================================================
 * Static Dashboard Cards
 * ==========================================================
 */

const dashboardCards: DashboardCard[] = [
  {
    id: 1,
    title: "Total Users",
    value: "120",
    color: "#2563EB",
    icon: "people",
  },
  {
    id: 2,
    title: "Total Reports",
    value: "45",
    color: "#16A34A",
    icon: "document-text",
  },
];

/**
 * ==========================================================
 * Static Dashboard Menu
 * ==========================================================
 */

const dashboardMenus: DashboardMenu[] = [
  {
    id: 1,
    title: "Users",
    icon: "people",
  },
  {
    id: 2,
    title: "Reports",
    icon: "document-text",
  },
];

/**
 * ==========================================================
 * Dashboard API (Static)
 * ==========================================================
 */

export const getDashboardApi =
  async (): Promise<DashboardResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          dashboardTitle: "Welcome to Dashboard",
          cards: dashboardCards,
          menus: dashboardMenus,
        });
      }, 800);
    });
  };