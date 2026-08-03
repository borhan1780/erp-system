import type { PropsWithChildren } from "react";
import { useState } from "react";

import { DashboardSessionContext } from "./dashboard-session";

export function DashboardSessionProvider({ children }: PropsWithChildren) {
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(null);

  const [currentLedgerId, setCurrentLedgerId] = useState<string | null>(null);

  const [currentPeriodId, setCurrentPeriodId] = useState<string | null>(null);

  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);

  return (
    <DashboardSessionContext.Provider
      value={{
        currentCompanyId,
        setCurrentCompanyId,

        currentLedgerId,
        setCurrentLedgerId,

        currentPeriodId,
        setCurrentPeriodId,

        currentModuleId,
        setCurrentModuleId,
      }}
    >
      {children}
    </DashboardSessionContext.Provider>
  );
}
