import { Fade, Paper } from "@mui/material";

import { LoginHeader } from "./LoginHeader";
import { LoginForm } from "./LoginForm";

export function LoginCard() {
  return (
    <Fade in timeout={700}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 520,

          borderRadius: 6,

          overflow: "hidden",

          bgcolor: "#fff",

          border: "1px solid",
          borderColor: "divider",

          boxShadow:
            "0 24px 60px rgba(15,23,42,.12), 0 8px 24px rgba(109, 131, 180, 0.06)",

          transition: "all .25s ease",

          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 32px 70px rgba(15,23,42,.16), 0 10px 30px rgba(117, 119, 126, 0.08)",
          },
        }}
      >
        <LoginHeader />

        <LoginForm />
      </Paper>
    </Fade>
  );
}
