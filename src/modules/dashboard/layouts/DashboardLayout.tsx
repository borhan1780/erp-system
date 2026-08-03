import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import DashboardHeader from "../components/Header/DashboardHeader";

export default function DashboardLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#eef5ff",
        direction: "rtl",
      }}
    >
      <DashboardHeader />

      <Box
        component="main"
        sx={{
          width: "100%",
          py: 5,
          px: { xs: 2, md: 4 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
