import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  if (!isAuthenticated() || !(auth()?.roles?.includes("ADMIN"))) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default AdminRoute;