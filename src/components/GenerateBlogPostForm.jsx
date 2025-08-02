import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import axiosInstance from "../utils/AxiosInstance";
import { API_PATHS } from "../utils/ApiPath";
import { LuLoaderCircle } from "react-icons/lu";

const GenerateBlogPostForm = ({
  contentParams,
  setPostContent,
  handleCloseForm,
}) => {
  const [fromData, setFromData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setFromData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleGenerateBlogPost = async (e) => {
    e.preventDefault();
    const { title, tone } = fromData;

    if (!title || !tone) {
      setError("Title and tone are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call AI API to generate blog post
      console.log("Generating blog post with title:", title, "and tone:", tone);
      
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST,
        {
          title,
          tone,
        }
      );
        console.log("AI Response:", aiResponse.data);
        
      const generatedPost = aiResponse.data.rawText;
      setPostContent(title, generatedPost || "");
      handleCloseForm();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while generating the blog post.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Generate a Blog Post</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Provide a title and tone to generate a blog post.
      </p>

      <form onSubmit={handleGenerateBlogPost} className="flex flex-col gap-3">
        <Input
          value={fromData.title}
          onChange={({ target }) => handleChange("title", target.value)}
          label={"Blog Post Title"}
          placeholder={""}
          type={"text"}
        />
        <Input
          value={fromData.tone}
          onChange={({ target }) => handleChange("tone", target.value)}
          label={"Tone"}
          placeholder={""}
          type={"text"}
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button className="btn-primary w-full mt-2" type="submit" disabled={loading}>
          {loading && <LuLoaderCircle className="animate-spin text-[18px]" />}{" "}
          {loading ? "Generating..." : "Generate Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default GenerateBlogPostForm;
