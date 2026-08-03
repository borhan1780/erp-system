import { useContext } from "react";
import { DashboardSessionContext } from "./dashboard-session";

export function useCurrentModule() {
  const context = useContext(DashboardSessionContext);

  if (!context) {
    throw new Error(
      "useCurrentModule must be used inside DashboardSessionProvider",
    );
  }

  return {
    currentModuleId: context.currentModuleId,
    setCurrentModuleId: context.setCurrentModuleId,
  };
}
