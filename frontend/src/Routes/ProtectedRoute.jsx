import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
