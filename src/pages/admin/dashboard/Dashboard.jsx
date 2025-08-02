import {  useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { DashboardService } from "./service/DashboardService";
import UserGreeting from "./components/UserGreeting";
import DashboardSummary from "./components/DashboardSummary";
import DashboardTopPost from "./components/DashboardTopPost";
import DashboardTagInsights from "./components/DashboardTagInsightsCard";
import DashboardRecentComments from "./components/DashboardRecentComments";
const Dashboard = () => {
  const [dashboardData, setDashbaordData] = useState(null);
  const [maxViews, setMaxViews] = useState(0);

  const getDashboardData = async () => {
    try {
      const { dashboardData, totalViews } =
        await DashboardService.dashboardData();

      setDashbaordData(dashboardData);
      setMaxViews(totalViews);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      {dashboardData && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-5">
            <UserGreeting />
            <DashboardSummary dashboardData={dashboardData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4 md:my-6">
            <DashboardTagInsights dashboardData={dashboardData} />
            <DashboardTopPost
              dashboardData={dashboardData}
              maxViews={maxViews}
            />

            <DashboardRecentComments dashboardData={dashboardData} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
