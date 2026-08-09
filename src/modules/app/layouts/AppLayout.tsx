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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f8fc", direction: "rtl", dir: "rtl" }}>
      <CssBaseline />

      {/* هدر بالایی */}
      <AppHeader onMenuClick={handleDrawerToggle} />

      {/* بدنه اصلی */}
      <Box sx={{ display: "flex", pt: "64px", minHeight: "100vh", direction: "rtl", dir: "rtl" }}>
        
        {/* بخش محتوای اصلی - چسبیده به سمت راست سایدبار */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            mr: { md: `${DRAWER_WIDTH}px` }, // مارجین از سمت راست برای جای‌گیری سایدبار
            ml: 0,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <Outlet />
        </Box>

        {/* سایدبار ثابت سمت راست */}
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
      </Box>
    </Box>
  );
}