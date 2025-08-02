import React from "react";
import RecentCommentsList from "../../../../components/cards/RecentCommentsList";

const DashboardRecentComments = ({ dashboardData }) => {
  return (
    <div className="col-span-12 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">Recent Comments</h5>
      </div>
      <RecentCommentsList comments={dashboardData.recentComments || []} />
    </div>
  );
};

export default DashboardRecentComments;
