import { API_PATHS } from "../../../../utils/ApiPath";
import axiosInstance from "../../../../utils/AxiosInstance";

export const DashboardService = {
  dashboardData: async () => {
    const response = await axiosInstance.get(
      API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
    );

    if (response.data) {
      const topPosts = response.data.topPosts || [];
      const totalViews = Math.max(...topPosts.map((p) => p.views), 1);

      return {
        dashboardData: response.data,
        totalViews,
      };
    }else {
        throw new Error("Failed to fetch dashboard data. Please try again.");
    }
  },
};
