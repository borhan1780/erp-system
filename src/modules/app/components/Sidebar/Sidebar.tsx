import { Drawer, Box, CircularProgress, Typography } from "@mui/material";
import { useMenu } from "../../hooks/useMenu";
import { MenuTree } from "../MenuTree/MenuTree";

const DRAWER_WIDTH = 280;

export function Sidebar() {
  const { data: menu, isLoading, isError } = useMenu();

  return (
    <Drawer
      variant="permanent"
      anchor="right" 
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          top: 64,
          height: "calc(100% - 64px)",
          borderLeft: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ overflow: "auto", p: 2, dir: "rtl" }}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {isError && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ py: 2 }}
          >
            خطا در دریافت منوی سیستم
          </Typography>
        )}

        {menu && <MenuTree items={menu} />}
      </Box>
    </Drawer>
  );
}
