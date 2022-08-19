import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = ({ }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const NonPrivateRoute = ({ }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};