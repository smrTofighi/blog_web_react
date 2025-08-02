import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { API_PATHS } from "../utils/ApiPath";
import { UserContext } from "../context/UserContext";
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  //const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

        setUser(response.data);
      } catch (error) {
        console.log("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
   
    
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const clearUser = () => {
    setUser(null);
    //setSearchResult([]);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        openAuthForm,
        setOpenAuthForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
