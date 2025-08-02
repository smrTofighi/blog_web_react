import React, { useEffect, useState } from "react";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/ApiPath";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import moment from "moment";
import TrendingPostsSection from "./components/TrendingPostsSection";

const PostByTags = () => {
  const { tagName } = useParams();
  const navigate = useNavigate();
  const [blogPostList, setBlogPostList] = useState([]);

  const getPostsByTag = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_TAG(tagName)
      );

      setBlogPostList(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching blog posts from server", error);
    }
  };
  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    getPostsByTag();
    return () => {};
  }, [tagName]);
  return (
    <BlogLayout>
      <div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-9">
            <div className="flex items-center justify-center bg-linear-to-r from-sky-50 via-teal-50 to-cyan-100 h-32 p-6 rounded-lg">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-sky-900"># {tagName}</h3>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  Showing {blogPostList.length} posts tagged with #{tagName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {blogPostList.length > 0 &&
                blogPostList.map((post) => (
                  <BlogPostSummaryCard
                    key={post._id}
                    title={post.title}
                    coverImageUrl={post.coverImageUrl}
                    description={post.content}
                    tags={post.tags}
                    updateOn={
                      post.updatedAt
                        ? moment(post.updatedAt).format("Do MMM YYYY")
                        : "-"
                    }
                    authorName={post.author.name}
                    authorProfileImg={post.author.profileImageUrl}
                    onClick={() => handleClick(post)}
                  />
                ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-3">
            <TrendingPostsSection />
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default PostByTags;
