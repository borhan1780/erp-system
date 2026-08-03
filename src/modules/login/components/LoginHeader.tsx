import { Avatar, Box, Divider, Typography } from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export function LoginHeader() {
  return (
    <Box
      sx={{
        position: "relative",

        background: "linear-gradient(135deg,#4A90F5 0%, #2F80ED 100%)",

        color: "#fff",

        px: 5,
        py: 5,

        textAlign: "center",

        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,.18), transparent 45%)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 72,
          height: 72,

          mx: "auto",
          mb: 2.5,

          bgcolor: "rgba(255,255,255,.18)",

          backdropFilter: "blur(6px)",

          border: "1px solid rgba(255,255,255,.25)",
        }}
      >
        <AutoAwesomeRoundedIcon
          sx={{
            fontSize: 40,
            color: "#FFD54F",
          }}
        />
      </Avatar>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          letterSpacing: ".5px",
        }}
      >
        نوآوران
      </Typography>

      <Typography
        sx={{
          mt: 1,
          opacity: 0.9,
          fontSize: 15,
        }}
      >
        نرم افزار یکپارچه برنامه‌ریزی منابع سازمانی
      </Typography>

      <Divider
        sx={{
          mt: 3,
          bgcolor: "rgba(255,255,255,.18)",
        }}
      />
    </Box>
  );
}
