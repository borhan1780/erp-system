import { useContext } from "react";

import { DashboardSessionContext } from "./dashboard-session";

export function useCurrentCompany() {
  const context = useContext(DashboardSessionContext);

  if (!context) {
    throw new Error(
      "useCurrentCompany must be used inside DashboardSessionProvider",
    );
  }

  return {
    currentCompanyId: context.currentCompanyId,
    setCurrentCompanyId: context.setCurrentCompanyId,
  };
}
