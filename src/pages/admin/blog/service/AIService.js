import { API_PATHS } from "../../../../utils/ApiPath";
import axiosInstance from "../../../../utils/AxiosInstance";

export const AIService = {
    generatePostIdeas: async ()=>{
        const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
        {
          topics: "React JS, Next JS, Nest JS, Node JS, JAVA, Kotlin, Flutter, Docker, Go, Python",
        }
      );

      const generatedIdeas = aiResponse.data;

      if (generatedIdeas?.length > 0) {
        return generatedIdeas
      } else {
        throw new Error("Error to get Post Ideas AI")
      }
    }
}