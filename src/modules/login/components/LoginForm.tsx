import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useLocation, useNavigate } from "react-router-dom";

import { useLoginForm } from "../hooks/useLoginForm";
import { authStorage } from "@/core/security";

export function LoginForm() {
  const { register, handleSubmit, errors, onSubmit, isPending } =
    useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // استخراج مسیر قبلی کاربر یا استفاده از مسیر پیش‌فرض /dashboard
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

const handleFormSubmit = async (data: any) => {
    try {
      // تایپ‌دهی صریح پاسخ لاگین جهت رفع خطای TypeScript
      const response = (await onSubmit(data)) as { accessToken?: string } | undefined;

      // ذخیره توکن
      if (response?.accessToken) {
        authStorage.setAccessToken(response.accessToken);
      }

      // هدایت کاربر به صفحه‌ای که قصد ورود به آن را داشت
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      sx={{
        px: 5,
        py: 5,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "text.primary",
        }}
      >
        ورود به سامانه
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          textAlign: "center",
          color: "text.secondary",
          fontSize: 15,
        }}
      >
        برای ادامه، نام کاربری و رمز عبور خود را وارد کنید.
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: 14,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              نام کاربری
            </Typography>

            <TextField
              fullWidth
              placeholder="نام کاربری"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 54,
                  borderRadius: 3,
                  bgcolor: "#fafbfc",
                  transition: "all .2s",

                  "&:hover": {
                    bgcolor: "#fff",
                  },

                  "&.Mui-focused": {
                    bgcolor: "#fff",
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: 14,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              رمز عبور
            </Typography>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffRoundedIcon color="primary" />
                        ) : (
                          <VisibilityRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 54,
                  borderRadius: 3,
                  bgcolor: "#fafbfc",
                  transition: "all .2s",

                  "&:hover": {
                    bgcolor: "#fff",
                  },

                  "&.Mui-focused": {
                    bgcolor: "#fff",
                  },
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            startIcon={<LoginRoundedIcon />}
            disabled={isPending}
            sx={{
              mt: 1,
              height: 54,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
              fontWeight: 700,
              boxShadow: "0 10px 24px rgba(47,128,237,.25)",
              transition: "all .2s",

              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 14px 32px rgba(47,128,237,.35)",
              },
            }}
          >
            {isPending ? "در حال ورود..." : "ورود"}
          </Button>
        </Stack>
      </Box>

      <Typography
        sx={{
          mt: 4,
          textAlign: "center",
          fontSize: 12,
          color: "text.secondary",
        }}
      />
    </Box>
  );
}