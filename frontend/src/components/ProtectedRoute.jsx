import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // read user from localStorage
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // if not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // else render the page
  return children;
}

export default ProtectedRoute;
