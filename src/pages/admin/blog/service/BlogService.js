import { API_PATHS } from "../../../../utils/ApiPath";
import axiosInstance from "../../../../utils/AxiosInstance";
import uploadImage from "../../../../utils/UploadImage";

export const BlogService = {
  getAllPost: async ({ filterStatus, pageNumber }) => {
    const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
      params: {
        status: filterStatus,
        page: pageNumber,
      },
    });
    const { posts, totalPage, counts } = response.data;

    const statusSummary = counts || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Published", count: statusSummary.published || 0 },
        { label: "Draft", count: statusSummary.draft || 0 },
      ];
    return {
        posts, totalPage, statusArray
    }
  },

  deletePost: async (postId)=>{
    await axiosInstance.delete(API_PATHS.POSTS.DELETE(postId));
  },

  publishPost: async({postData, isDraft, isEdit})=>{
    let coverImageUrl = "";
    if (!postData.title.trim()) {
      throw new Error("Title is required.");
      
    }
    if (!postData.content.trim()) {
      throw new Error("Content is required.");
     
    }

    if (!isDraft) {
      if (!isEdit && !postData.coverImageUrl) {
        throw new Error("Cover image is required for new posts.");
       
      }
      if (isEdit && !postData.coverImageUrl && !postData.coverPreview) {
        throw new Error("Cover image is required for editing posts.");
        
      }
      if (!postData.tags.length) {
        throw new Error("At least one tag is required.");
       
      }
    }
   
    
      // Check if a new image was uploaded (File type)
      if (postData.coverImageUrl instanceof File) {
        const imgUploadRes = await uploadImage(postData.coverImageUrl);
        console.log("Image Upload Response:", imgUploadRes);

        coverImageUrl = imgUploadRes.imgUrl || "";
      } else {
        coverImageUrl = postData.coverPreview;
      }

      const repPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl: coverImageUrl,
        tags: postData.tags,
        isDraft: isDraft ? true : false,
        generatedByAI: true,
      };

      const response = isEdit
        ? await axiosInstance.put(
            API_PATHS.POSTS.UPDATE(postData.id),
            repPayload
          )
        : await axiosInstance.post(API_PATHS.POSTS.CREATE, repPayload);

      if(response.data){
        return response.data
      } else {
        throw new Error("Not Found!")
      }
    
  },

  fetchPostDetialsBySlug: async(postSlug)=>{
    const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(postSlug)
      );

      if (response.data) {
        console.log(response.data);

        return response.data;
      } else {
        throw new Error("Error to get detials of the post");
      }
  }
  
};
