import { Box } from "@mui/material";

import { LoginCard } from "../components/LoginCard";

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,

        bgcolor: "#f6f8fc",

        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(15,23,42,.05) 1px, transparent 0)
        `,
        backgroundSize: "26px 26px",

        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(47,128,237,.08), transparent 40%), radial-gradient(circle at bottom left, rgba(47,128,237,.06), transparent 35%)",
          pointerEvents: "none",
        },
      }}
    >
      <LoginCard />
    </Box>
  );
}
