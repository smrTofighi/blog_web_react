import React from "react";
import DashboardSummaryCard from "../../../../components/cards/DashboardSummaryCard";
import { LuChartLine, LuCheckCheck, LuGalleryVerticalEnd, LuHeart } from "react-icons/lu";

const DashboardSummary = ({dashboardData}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
      <DashboardSummaryCard
        icon={<LuGalleryVerticalEnd />}
        label="Total Posts"
        value={dashboardData?.status?.totalPosts || 0}
        bgColor="bg-sky-100/60"
        color="text-sky-500"
        color2="text-sky-400"
      />
      <DashboardSummaryCard
        icon={<LuCheckCheck />}
        label="Published Posts"
        value={dashboardData?.status?.published || 0}
        bgColor="bg-purple-100/60"
        color="text-purple-500"
        color2="text-purple-400"
      />{" "}
      <DashboardSummaryCard
        icon={<LuChartLine />}
        label="Total Views"
        value={dashboardData?.status?.totalViews || 0}
        bgColor="bg-green-100/60"
        color="text-green-500"
        color2="text-green-400"
      />{" "}
      <DashboardSummaryCard
        icon={<LuHeart />}
        label="Total Likes"
        value={dashboardData?.status?.totalLikes || 0}
        bgColor="bg-rose-100/60"
        color="text-rose-500"
        color2="text-rose-400"
      />
    </div>
  );
};

export default DashboardSummary;
