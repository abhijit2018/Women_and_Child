import { getDashboardApi } from "./api/dashboardApi";

import { DashboardResponse } from "./dashboardTypes";

class DashboardService {
  /**
   * ==========================================================
   * Get Dashboard Data
   * ==========================================================
   */
  async getDashboard(): Promise<DashboardResponse> {
    try {
      const response = await getDashboardApi();

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();