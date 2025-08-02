import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ClipLoader } from "react-spinners";
const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <ClipLoader color="#00A7F3" />;
  if (!user) return <Navigate to={"/"} replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to={"/"} replace />;
  return <Outlet />;
};

export default PrivateRoute;
