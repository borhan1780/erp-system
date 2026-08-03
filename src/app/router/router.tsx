import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { LoginPage } from "@/modules/login/pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import { DashboardSessionProvider } from "@/modules/dashboard/session/DashboardSessionProvider";

// Importهای مربوط به ماژول اصلی ERP
import { AppLayout } from "@/modules/app/layouts/AppLayout";
import { Paper, Typography } from "@mui/material";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        // Provider در سطح بالا قرار گرفت تا Context دیتای انتخاب شده در /app هم در دسترس باشد
        element: (
          <DashboardSessionProvider>
            <Outlet />
          </DashboardSessionProvider>
        ),
        children: [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
            ],
          },
          {
            path: "/app",
            element: <AppLayout />,
            children: [
              {
                path: "tree",
                element: (
                  <Paper sx={{ p: 4, borderRadius: 3, dir: "rtl" }}>
                    <Typography
                      variant="h5"
                      align="right"
                      sx={{ fontWeight: 700 }}
                    >
                      به محیط کلی ERP خوش آمدید
                    </Typography>
                    <Typography
                      variant="body2"
                      align="right"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      از منوی سمت راست می‌توانید بخش‌های مختلف سیستم را انتخاب
                      کنید.
                    </Typography>
                  </Paper>
                ),
              },
              {
                path: "module",
                element: (
                  <Paper sx={{ p: 4, borderRadius: 3, dir: "rtl" }}>
                    <Typography
                      variant="h5"
                      align="right"
                      sx={{ fontWeight: 700 }}
                    >
                      به ماژول انتخابی خوش آمدید
                    </Typography>
                    <Typography
                      variant="body2"
                      align="right"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      منوی سمت راست اختصاصاً زیرمجموعه‌های این ماژول را نمایش
                      می‌دهد.
                    </Typography>
                  </Paper>
                ),
              },
              {
                index: true,
                element: <Navigate to="module" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
