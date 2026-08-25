import { treasuryApi } from "@/core/api/client";
import type { GetPaymentsParams, PaymentsResponse } from "../types/payment.types";

export async function getPayments({
  companyId,
  ledgerId,
  periodId,
  page = 1,
  pageSize = 30,
  ...restFilters
}: GetPaymentsParams): Promise<PaymentsResponse> {
  const searchParams: Record<string, string> = {
    page: page.toString(),
    page_size: pageSize.toString(),
  };

  Object.entries(restFilters).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      searchParams[key] = val.toString();
    }
  });

  return treasuryApi
    .get(
      `/${companyId}/transactions/ledgers/${ledgerId}/periods/${periodId}/payment-list/`,
      {
        searchParams,
      }
    )
    .json<PaymentsResponse>();
}