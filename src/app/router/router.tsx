import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { LoginPage } from "@/modules/login/pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import { DashboardSessionProvider } from "@/modules/dashboard/session/DashboardSessionProvider";

import { AppLayout } from "@/modules/app/layouts/AppLayout";
import { ModulePage } from "@/modules/app/pages/ModulePage";
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
                    <Typography variant="h5" align="right" sx={{ fontWeight: 700 }}>
                        خوش امدید ERP به محیط
                    </Typography>
                    <Typography variant="body2" align="right" color="text.secondary" sx={{ mt: 1 }}>
                      از منوی سمت چپ می‌توانید بخش‌های مختلف سیستم را انتخاب کنید.
                    </Typography>
                  </Paper>
                ),
              },
              {
                path: "module/:modulePrefix",
                element: <ModulePage />,
              },
              {
                index: true,
                element: <Navigate to="tree" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
]);