import React from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const BlogPostsHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold mt-5 mb-5">Blog Posts</h2>
      <button className="btn-small" onClick={() => navigate("/admin/create")}>
        <LuPlus className="text-[18px]" /> Create Post
      </button>
    </div>
  );
};

export default BlogPostsHeader;
