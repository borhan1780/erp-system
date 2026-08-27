import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { LoginPage } from "@/modules/login/pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import { DashboardSessionProvider } from "@/modules/dashboard/session/DashboardSessionProvider";

import { AppLayout } from "@/modules/app/layouts/AppLayout";
import { ModulePage } from "@/modules/app/pages/ModulePage";
import { VouchersPage } from "@/modules/accounting/pages/VouchersPage";
import { PaymentPage } from "@/modules/treasury/pages/PaymentPage";
import { PaymentItemsPage } from "@/modules/treasury/pages/PaymentItemsPage";

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
              {
                path: "/current-affairs/vouchers",
                element: <VouchersPage />,
              },
              {
                path: "/current-affairs/payment-transactions",
                element: <PaymentPage />,
              },

              {
                path: "/app",
                element: <Navigate to="/app/tree" replace />,
              },
              {
                path: "/current-affairs/payment-transactions/:transactionId/items",
                element: <PaymentItemsPage />,
},
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);