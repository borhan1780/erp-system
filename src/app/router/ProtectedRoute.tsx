import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStorage } from "@/core/security";
import { useMe } from "@/modules/dashboard/hooks/useMe";
import { Box, CircularProgress } from "@mui/material";

export function ProtectedRoute() {
  const location = useLocation();
  const token = authStorage.getAccessToken();

  const { isLoading, isError } = useMe();

  // ۱. اگر توکن معتبر وجود ندارد، بلافاصله هدایت به لاگین (بدون رندر صفحه)
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // ۲. نمایش لودینگ فقط زمان رفرش که توکن واقعی داریم
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#f6f8fc",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  // ۳. در صورت نامعتبر بودن توکن در API
  if (isError) {
    authStorage.clear();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}