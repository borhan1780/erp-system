import { accountingApi } from "@/core/api/client";
import type { GetVouchersParams, VouchersResponse } from "../types/vouchers.types";

export async function getVouchers({
  companyId,
  ledgerId,
  periodId,
  page = 1,
  pageSize = 5,
}: GetVouchersParams): Promise<VouchersResponse> {
  return accountingApi
    .get(`/${companyId}/vouchers/ledgers/${ledgerId}/periods/${periodId}/`, {
      searchParams: {
        page: page.toString(),
        page_size: pageSize.toString(),
      },
    })
    .json<VouchersResponse>();
}