import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/modules/login/pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import { DashboardSessionProvider } from "@/modules/dashboard/session/DashboardSessionProvider";

import DashboardPage from "@/modules/dashboard/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: (
          <DashboardSessionProvider>
            <DashboardLayout />
          </DashboardSessionProvider>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);