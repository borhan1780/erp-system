import { useContext } from "react";

import { DashboardSessionContext } from "./dashboard-session";

export function useCurrentLedger() {
  const context = useContext(DashboardSessionContext);

  if (!context) {
    throw new Error(
      "useCurrentLedger must be used inside DashboardSessionProvider",
    );
  }

  return {
    currentLedgerId: context.currentLedgerId,
    setCurrentLedgerId: context.setCurrentLedgerId,
  };
}
