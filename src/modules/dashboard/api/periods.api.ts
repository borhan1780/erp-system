import { accountingApi } from "@/core/api/client";

import type { PeriodsResponse } from "../types";

export async function getPeriods(companyId: string): Promise<PeriodsResponse> {
  return accountingApi
    .get(`${companyId}/ledgers/periods/`)
    .json<PeriodsResponse>();
}
