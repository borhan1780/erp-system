import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <CssBaseline />

      {/* Header اصلی بالای صفحه */}
      <AppHeader />

      {/* Sidebar منوی درختی */}
      <Sidebar />

      {/* بخش اصلی محتوای صفحات ERP */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 10, // فاصله از بالا به خاطر AppHeader ثابت
          width: "calc(100% - 280px)",
          dir: "rtl",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
