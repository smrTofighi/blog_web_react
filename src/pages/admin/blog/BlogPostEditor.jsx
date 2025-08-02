import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import MDEditor, { commands } from "@uiw/react-md-editor";
import toast from "react-hot-toast";
import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkles,
  LuTrash2,
} from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import CoverImageSelector from "../../../components/inputs/CoverImageSelector";
import TagInput from "../../../components/inputs/TagInput";
import SkeletonLoader from "../../../components/loader/SkeletonLoader";
import BlogPostIdeaCard from "../../../components/cards/BlogPostIdeaCard";
import Modal from "../../../components/Modal";
import GenerateBlogPostForm from "../../../components/GenerateBlogPostForm";
import { getToastMessageByType } from "../../../utils/Helper";
import DeleteAlertContent from "../../../components/DeleteAlertContent";
import { AIService } from "./service/AIService";
import { BlogService } from "./service/BlogService";

const BlogPostEditor = ({ isEdit }) => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    coverImageUrl: "",
    coverPreview: "",
    isDraft: "",
    generatedByAI: false,
    content: "",
    tags: "",
  });

  const [postIdeas, setPostIdeas] = useState([]);

  const [error, setError] = useState(false);
  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });

  const [ideaLoading, setIdeaLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  // Generate Blog post ideas using AI

  const generatePostIdeas = async () => {
    setIdeaLoading(true);
    try {
      const generatedIdeas = await AIService.generatePostIdeas();
      setPostIdeas(generatedIdeas);
    } catch (error) {
      console.log("Error to get Post Ideas AI", error);
    } finally {
      setIdeaLoading(false);
    }
  };

  // Handle blog post publish

  const handlePublish = async (isDraft) => {
    setLoading(true);
    setError("");
    try {
      const response = await BlogService.publishPost(postData, isDraft, isEdit);

      if (response.data) {
        toast.success(
          getToastMessageByType(
            isDraft ? "draft" : isEdit ? "edit" : "published"
          )
        );
        navigate("/admin/posts");
      }
    } catch (error) {
      setError(Error);
      console.error("Error publishing post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get post data by slug
  const fetchPostDetialsBySlug = async () => {
    try {
      const response = await BlogService.fetchPostDetialsBySlug(postSlug)

     
        const data = response;
       
        
        setPostData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags,
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI,
        }));
      
    } catch (error) {
      console.error("Error fetching post details:", error);
      setError("Failed to fetch post details. Please try again.");
    }
  };

  // Delete blog post
  const deletePost = async () => {
    try {
      await BlogService.deletePost(postData.id);

      toast.success("Post deleted successfully.");
      setOpenDeleteAlert(false);
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchPostDetialsBySlug();
    } else {
      generatePostIdeas();
    }

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu={"Blog Posts"}>
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12 md:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">
                {isEdit ? "Edit Post" : "Add New Post"}
              </h2>
              <div className="flex items-center gap-3">
                {isEdit && (
                  <button
                    className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 bg-rose-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-100 hover:border-rose-400 cursor-pointer hover:scale-[1.05] transition-all"
                    onClick={() => setOpenDeleteAlert(true)}
                    disabled={loading}
                  >
                    <LuTrash2 className="text-sm" />{" "}
                    <span className="hidden md:block">Delete</span>
                  </button>
                )}
                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.05] transition-all"
                  onClick={() => handlePublish(true)}
                  disabled={loading}
                >
                  <LuSave className="text-sm" />
                  <span className="hidden md:block">Save as Draft</span>
                </button>
                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-indigo-500 rounded px-3 py-[3px] border border-sky-500 hover:border-sky-50 cursor-pointer transition-all"
                  disabled={loading}
                  onClick={() => handlePublish(false)}
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSend className="text-sm" />
                  )}{" "}
                  Publish
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Post Title
              </label>

              <input
                placeholder="How to Build a MERN App"
                className="form-input"
                value={postData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className="mt-4">
              <CoverImageSelector
                image={postData.coverImageUrl}
                setImage={(value) => handleValueChange("coverImageUrl", value)}
                preview={postData.coverPreview}
                setPreview={(value) => handleValueChange("coverPreview", value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Content
              </label>
              <div data-color-mode="light" className="mt-3">
                <MDEditor
                  value={postData.content}
                  onChange={(data) => {
                    handleValueChange("content", data);
                  }}
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.heading,
                    commands.divider,
                    commands.link,
                    commands.code,
                    commands.image,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                  ]}
                  hidemenu={"true"}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">Tags</label>
              <TagInput
                tags={postData.tags || []}
                setTags={(data) => {
                  handleValueChange("tags", data);
                }}
              />
            </div>
          </div>

          {!isEdit && (
            <div className="form-card col-span-12 md:col-span-4 p-0">
              <div className="flex items-center justify-between px-6 pt-6">
                <h4 className="text-sm md:text-base font-medium inline-flex items-center gap-2">
                  <span className="text-sky-600">
                    <LuSparkles />
                  </span>
                  Ideas for your next post
                </h4>

                <button
                  className="bg-linear-to-r from-sky-500 to-cyan-400 text-[13px] font-semibold text-white px-3 py-1 rounded hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-sky-200"
                  onClick={() =>
                    setOpenBlogPostGenForm({ open: true, data: null })
                  }
                >
                  Generate New
                </button>
              </div>
              <div>
                {ideaLoading ? (
                  <div className="p-5">
                    <SkeletonLoader />
                  </div>
                ) : (
                  postIdeas.map((idea, index) => (
                    <BlogPostIdeaCard
                      key={`idea-${index}`}
                      title={idea.title || ""}
                      description={idea.description || ""}
                      tags={postIdeas.tags || []}
                      tone={idea.tone || "casual"}
                      onSelect={() =>
                        setOpenBlogPostGenForm({ open: true, data: idea })
                      }
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={openBlogPostGenForm?.open}
        onClose={() => setOpenBlogPostGenForm({ open: false, data: null })}
        hideHeader
      >
        <GenerateBlogPostForm
          contentParams={openBlogPostGenForm?.data || null}
          setPostContent={(title, content) => {
            const postInfo = openBlogPostGenForm?.data || null;
            console.log(postInfo);

            setPostData((prevState) => ({
              ...prevState,
              title: title || prevState.title,
              tags: postInfo?.tags || prevState.tags,
              generatedByAI: true,
              content: content,
            }));
          }}
          handleCloseForm={() => {
            setOpenBlogPostGenForm({ open: false, data: null });
          }}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title={"Delete Alert"}
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content={"Are you sure you want to delete this post?"}
            onDelete={() => deletePost()}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPostEditor;
