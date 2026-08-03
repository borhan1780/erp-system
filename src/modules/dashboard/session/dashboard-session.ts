import { createContext } from "react";

export interface DashboardSessionContextValue {
  currentCompanyId: string | null;
  setCurrentCompanyId: (id: string | null) => void;

  currentLedgerId: string | null;
  setCurrentLedgerId: (id: string | null) => void;

  currentPeriodId: string | null;
  setCurrentPeriodId: (id: string | null) => void;

  currentModuleId: number | null;
  setCurrentModuleId: (id: number | null) => void;
}

export const DashboardSessionContext =
  createContext<DashboardSessionContextValue | null>(null);
