import React from "react";
import TagInsights from '../../../../components/cards/TagInsights'
const DashboardTagInsights = ({ dashboardData }) => {
  return (
    <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">Tag Insights</h5>
      </div>
      <TagInsights tagUsages={dashboardData?.tagUsage || []} />
    </div>
  );
};

export default DashboardTagInsights;
