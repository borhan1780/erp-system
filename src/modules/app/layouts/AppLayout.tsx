import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { AppHeader } from "../components/AppHeader/AppHeader";

const DRAWER_WIDTH = 280;

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f8fc", direction: "rtl" }}>
      <CssBaseline />

      {/* ۱. AppHeader سرتاسری بالا */}
      <AppHeader onMenuClick={handleDrawerToggle} />

      {/* ۲. بدنه زیر هدر */}
      <Box sx={{ display: "flex", pt: "64px", minHeight: "100vh" }}>
        
        {/* بخش محتوای اصلی (در سمت چپ سایدبار قرار می‌گیرد) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            marginRight: { md: `${DRAWER_WIDTH}px` }, 
            marginLeft: 0,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minWidth: 0,
          }}
        >
          <Outlet />
        </Box>

        {/* سایدبار سمت راست */}
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
      </Box>
    </Box>
  );
}