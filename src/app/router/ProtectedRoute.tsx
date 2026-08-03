import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "@/core/security/";

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
