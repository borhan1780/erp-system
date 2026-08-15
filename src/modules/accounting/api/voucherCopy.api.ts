import { accountingApi } from "@/core/api/client";

export interface CopyVouchersParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
  targetPeriodId: string;
}

export interface CopyVouchersResponse {
  message?: string;
  [key: string]: unknown;
}

export async function copyVouchersToPeriod({
  companyId,
  ledgerId,
  periodId,
  targetPeriodId,
}: CopyVouchersParams): Promise<CopyVouchersResponse> {
  return accountingApi
    .post(
      `/${companyId}/facilities/ledgers/${ledgerId}/periods/${periodId}/voucher-copy/`,
      {
        json: {
          new_period_id: targetPeriodId,
        },
      }
    )
    .json<CopyVouchersResponse>();
}