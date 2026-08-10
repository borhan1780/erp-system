import type { PropsWithChildren } from "react";
import { useState } from "react";
import { DashboardSessionContext } from "./dashboard-session";

const KEYS = {
  COMPANY: "session_company_id",
  LEDGER: "session_ledger_id",
  PERIOD: "session_period_id",
  MODULE: "session_module_id",
} as const;

export function DashboardSessionProvider({ children }: PropsWithChildren) {
  const [currentCompanyId, setCurrentCompanyIdState] = useState<string | null>(
    () => localStorage.getItem(KEYS.COMPANY)
  );
  const [currentLedgerId, setCurrentLedgerIdState] = useState<string | null>(
    () => localStorage.getItem(KEYS.LEDGER)
  );
  const [currentPeriodId, setCurrentPeriodIdState] = useState<string | null>(
    () => localStorage.getItem(KEYS.PERIOD)
  );
  const [currentModuleId, setCurrentModuleIdState] = useState<number | null>(
    () => {
      const saved = localStorage.getItem(KEYS.MODULE);
      return saved ? Number(saved) : null;
    }
  );

  const setCurrentCompanyId = (id: string | null) => {
    setCurrentCompanyIdState(id);
    if (id) localStorage.setItem(KEYS.COMPANY, id);
    else localStorage.removeItem(KEYS.COMPANY);
  };

  const setCurrentLedgerId = (id: string | null) => {
    setCurrentLedgerIdState(id);
    if (id) localStorage.setItem(KEYS.LEDGER, id);
    else localStorage.removeItem(KEYS.LEDGER);
  };

  const setCurrentPeriodId = (id: string | null) => {
    setCurrentPeriodIdState(id);
    if (id) localStorage.setItem(KEYS.PERIOD, id);
    else localStorage.removeItem(KEYS.PERIOD);
  };

  const setCurrentModuleId = (id: number | null) => {
    setCurrentModuleIdState(id);
    if (id !== null) localStorage.setItem(KEYS.MODULE, id.toString());
    else localStorage.removeItem(KEYS.MODULE);
  };

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