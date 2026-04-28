import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/utils/authCookies";

const ProtectedRoute = () => {
  const location = useLocation();
  const authed = isAuthenticated();

  if (!authed) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
