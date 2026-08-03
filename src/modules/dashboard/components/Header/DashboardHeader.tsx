import { AppBar, Toolbar, Box } from "@mui/material";

import UserMenu from "./UserMenu";

export default function DashboardHeader() {
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
