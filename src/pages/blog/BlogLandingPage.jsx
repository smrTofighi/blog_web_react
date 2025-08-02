import React, { useEffect, useState } from "react";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/ApiPath";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LuGalleryVerticalEnd, LuLoaderCircle } from "react-icons/lu";
import FeaturedBlogPost from "./components/FeaturedBlogPost";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import TrendingPostsSection from "./components/TrendingPostsSection";

const BlogLandingPage = () => {
  const navigate = useNavigate();
  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch paginated blog posts
  const getAllPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        status: "published",
        page: pageNumber,
      });

      const { posts, totalPages } = response.data;
      setBlogPostList((prevState) =>
        pageNumber === 1 ? posts : [...prevState, ...posts]
      );

      setTotalPages(totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching blog posts from server", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (page < totalPages) {
      getAllPosts(page + 1);
    }
  };

  useEffect(() => {
    getAllPosts(1);
  }, []);

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-9">
          {blogPostList.length > 0 && (
            <FeaturedBlogPost
              title={blogPostList[0].title}
              coverImageUrl={blogPostList[0].coverImageUrl}
              description={blogPostList[0].content}
              tags={blogPostList[0].tags}
              updateOn={
                blogPostList[0].updatedAt
                  ? moment(blogPostList[0].updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              authorName={blogPostList[0].author.name}
              authorProfileImg={blogPostList[0].author.profileImageUrl}
              onClick={() => handleClick(blogPostList[0])}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {blogPostList.length > 0 &&
              blogPostList
                .slice(1)
                .map((post) => (
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

          {page < totalPages && (
            <div className="flex items-center justify-center mt-5">
              <button
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 mt-6 rounded-full text-nowrap hover:scale-110 transition-all cursor-pointer"
                disabled={loading}
                onClick={loadMorePosts}
              >
                {loading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuGalleryVerticalEnd className="text-lg" />
                )}{" "}
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-3">
          <TrendingPostsSection />
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogLandingPage;
