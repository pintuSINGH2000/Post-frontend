import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return <div>{user ? <Navigate to="/empty" /> : <Component />}</div>;
};

export default ProtectedRoute;
