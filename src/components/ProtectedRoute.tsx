import { Navigate, useLocation } from "react-router-dom";
import { JSX, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessTokenQueryParam = queryParams.get("access_token");

  if (location.pathname === "/dashboard" && accessTokenQueryParam) {
    localStorage.setItem("access_token", accessTokenQueryParam);
    return <Navigate to="/dashboard" replace />;
  }

  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Ensure children are returned inside a React fragment
};

export default ProtectedRoute;
