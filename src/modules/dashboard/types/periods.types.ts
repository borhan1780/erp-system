export interface Ledger {
  id: string;
  code: number;
  name: string;
  name2: string;
  is_leading: boolean;
  description: string | null;
}

export interface Period {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  previous_period: string | null;
}

export interface LedgerPeriod {
  id: string;
  ledger: Ledger;
  period: Period;
}

export type PeriodsResponse = LedgerPeriod[];
