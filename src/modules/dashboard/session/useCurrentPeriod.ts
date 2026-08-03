import { useContext } from "react";

import { DashboardSessionContext } from "./dashboard-session";

export function useCurrentPeriod() {
  const context = useContext(DashboardSessionContext);

  if (!context) {
    throw new Error(
      "useCurrentPeriod must be used inside DashboardSessionProvider",
    );
  }

  return {
    currentPeriodId: context.currentPeriodId,
    setCurrentPeriodId: context.setCurrentPeriodId,
  };
}
