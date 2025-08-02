import React from "react";
import TopPostCard from "../../../../components/cards/TopPostCard";

const DashboardTopPost = ({ dashboardData, maxViews }) => {
  return (
    <div className="col-span-12 md:col-span-5 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">Top Posts</h5>
      </div>
      {dashboardData?.topPosts?.slice(0, 3)?.map((post) => (
        <TopPostCard
          key={post._id}
          title={post.title}
          coverImageUrl={post.coverImageUrl}
          views={post.views}
          likes={post.likes}
          maxViews={maxViews}
        />
      ))}
    </div>
  );
};

export default DashboardTopPost;
