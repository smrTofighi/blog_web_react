import axiosInstance from "../../../../utils/AxiosInstance";
import { API_PATHS } from "../../../../utils/ApiPath";
import { validateEmail } from "../../../../utils/Helper";
import uploadImage from "../../../../utils/UploadImage";
export const AuthService = {
  signup: async ({
    fullName,
    email,
    password,
    profilePic,
    adminAccessToken,
  }) => {
    let profileImageUrl = "";
    if (!fullName) {
      throw new Error("Please enter your name");
    }

    if (!validateEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    if (profilePic) {
      const imageUploadRes = await uploadImage(profilePic);
      profileImageUrl = imageUploadRes.imgUrl || "";
    }
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name: fullName,
      email,
      password,
      profileImageUrl,
      adminAccessToken,
    });
    const { token, role } = response.data;
    if (token) {
      localStorage.setItem("token", token);
    }

    return { user: response.data, role };
  },
  login: async ({ email, password }) => {
    if (!validateEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (!password) {
      throw new Error("Password is required");
    }

    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    const { token, role } = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }

    return { user: response.data, role };
  },
};
