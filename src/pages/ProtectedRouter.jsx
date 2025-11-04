import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRouter = () => {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;
