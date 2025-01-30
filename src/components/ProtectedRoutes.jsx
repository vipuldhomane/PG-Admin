import { AUTH_TOKEN } from "@/config/AppConfig";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
