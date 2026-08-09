import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { LoginPage } from "@/modules/login/pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import { DashboardSessionProvider } from "@/modules/dashboard/session/DashboardSessionProvider";

import { AppLayout } from "@/modules/app/layouts/AppLayout";
import { ModulePage } from "@/modules/app/pages/ModulePage";
import { VouchersPage } from "@/modules/accounting/pages/VouchersPage"; // اضافه کردن صفحه اسناد حسابداری

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
            element: <AppLayout />,
            children: [
              {
                path: "/app/tree",
                element: <ModulePage />,
              },
              {
                path: "/app/module/:modulePrefix",
                element: <ModulePage />,
              },
              // --------------------------------------------------------
              // مسیر صفحه اسناد حسابداری زیرمجموعه AppLayout
              // --------------------------------------------------------
              {
                path: "/current-affairs/vouchers",
                element: <VouchersPage />,
              },
              {
                path: "/app",
                element: <Navigate to="/app/tree" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
]);