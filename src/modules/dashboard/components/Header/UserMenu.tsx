import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useMe } from "../../hooks/useMe";

import { useLogout } from "../../hooks/useLogout";

export default function UserMenu() {
  const navigate = useNavigate();

  const { data } = useMe();
  const logoutMutation = useLogout();

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography>{data?.display_name}</Typography>

      <Button
        color="error"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? "در حال خروج..." : "خروج"}
      </Button>
      <Avatar />
    </Box>
  );
}
