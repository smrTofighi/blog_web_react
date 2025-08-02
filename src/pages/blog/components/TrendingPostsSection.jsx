import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import { API_PATHS } from "../../../utils/ApiPath";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const TrendingPostsSection = () => {
  const navigate = useNavigate();
  const [trendingPosts, setTrendingPosts] = useState([]);

  const getTrendingPosts = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_TRENDING_POSTS
      );
      setTrendingPosts(response.data?.length > 0 ? response.data : []);
    } catch (error) {
        console.error("Error fetching trending posts", error);
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(()=>{
    getTrendingPosts();
    return ()=>{ }
}, [])

  return <div >
    <h4 className="text-base text-black font-medium mb-3">Recent Posts</h4>
    {trendingPosts.length > 0 && trendingPosts.map((post)=> (
        <PostCard
        key = {post._id}
        title={post.title}
        coverImageUrl={post.coverImageUrl}
        tags = {post.tags}
        onClick={() => handleClick(post)}
        />
    ))}
  </div>;
};

export default TrendingPostsSection;
