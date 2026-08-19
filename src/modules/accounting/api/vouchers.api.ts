import { accountingApi } from "@/core/api/client";
import type { GetVouchersParams, VouchersResponse } from "../types/vouchers.types";

export async function getVouchers({
  companyId,
  ledgerId,
  periodId,
  page = 1,
  pageSize = 5,
  number,
  from_number,
  to_number,
  date,
  from_date,
  to_date,
  description,
}: GetVouchersParams): Promise<VouchersResponse> {
  const searchParams: Record<string, string> = {
    page: page.toString(),
    page_size: pageSize.toString(),
  };

  // افزودن پارامترها در صورت داشتن مقدار
  if (number !== undefined && number !== "") searchParams.number = number.toString();
  if (from_number !== undefined && from_number !== "") searchParams.from_number = from_number.toString();
  if (to_number !== undefined && to_number !== "") searchParams.to_number = to_number.toString();
  if (date) searchParams.date = date;
  if (from_date) searchParams.from_date = from_date;
  if (to_date) searchParams.to_date = to_date;
  if (description?.trim()) searchParams.description = description.trim();

  return accountingApi
    .get(`/${companyId}/vouchers/ledgers/${ledgerId}/periods/${periodId}/`, {
      searchParams,
    })
    .json<VouchersResponse>();
}