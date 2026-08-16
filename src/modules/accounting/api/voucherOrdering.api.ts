import { accountingApi } from "@/core/api/client";

export interface OrderVouchersParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
}

export interface OrderVouchersResponse {
  message?: string;
  [key: string]: unknown;
}

export async function orderVouchersByDate({
  companyId,
  ledgerId,
  periodId,
}: OrderVouchersParams): Promise<OrderVouchersResponse> {
  return accountingApi
    .post(`${companyId}/vouchers/ledgers/${ledgerId}/periods/${periodId}/ordering/`)
    .json<OrderVouchersResponse>();
}