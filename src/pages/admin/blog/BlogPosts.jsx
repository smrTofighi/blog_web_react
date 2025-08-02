import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { LuGalleryVerticalEnd, LuLoaderCircle, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import Modal from "../../../components/Modal";
import Tabs from "../../../components/Tabs";
import BlogPostSummaryCard from "../../../components/cards/BlogPostSummaryCard";
import DeleteAlertContent from "../../../components/DeleteAlertContent";
import { BlogService } from "./service/BlogService";
import BlogPostsHeader from "./components/BlogPostsHeader";
const BlogPosts = () => {
  const navigate = useNavigate();

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // fetch all blog posts
  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);

      const { posts, totalPage, statusArray } = await BlogService.getAllPost(
        filterStatus.toLowerCase(),
        pageNumber
      );

      setBlogPostList((prevPosts) =>
        pageNumber === 1 ? posts : [...prevPosts, ...posts]
      );
      setTotalPage(totalPage);
      setPage(pageNumber);

      setTabs(statusArray);
    } catch (error) {
      console.log("Error fetching blog posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  // delete blog post
  const deletePost = async (postId) => {
    try {
      await BlogService.deletePost(postId);

      toast.success("Blog Post Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });

      getAllPosts();
    } catch (error) {
      console.log("Error to deleting post", error);
    }
  };

  // load more posts
  const handleLoadMore = () => {
    if (page < totalPage) {
      getAllPosts(page + 1);
    }
  };
  useEffect(() => {
    getAllPosts(1);
    return () => {};
  }, [filterStatus]);
  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <BlogPostsHeader />

        <Tabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />

        <div className="mt-5">
          {blogPostList.map((post) => (
            <BlogPostSummaryCard
              key={post._id}
              title={post.title}
              imgUrl={post.coverImageUrl}
              updatedOn={
                post.updatedAt
                  ? moment(post.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              tags={post.tags}
              views={post.views}
              likes={post.likes}
              onClick={() => navigate(`/admin/edit/${post.slug}`)}
              onDelete={() =>
                setOpenDeleteAlert({ open: true, data: post._id })
              }
            />
          ))}

          {page < totalPage && (
            <div className="flex items-center justify-center mb-8">
              <button
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 rounded-full text-nowrap hover:scale-105 transition-all cursor-pointer"
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                {isLoading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuGalleryVerticalEnd className="text-lg" />
                )}{" "}
                {isLoading ? "Loading ..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({
            open: false,
            data: null,
          });
        }}
        title={"Delete Alert"}
      >
        <div className="w-[70vw] md:w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this blog post?"
            onDelete={() => deletePost(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPosts;
