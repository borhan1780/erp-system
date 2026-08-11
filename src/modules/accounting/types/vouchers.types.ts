export interface VoucherItem {
  row_number: number;
  id: string;
  id_initial: string;
  serial: number;
  status: "FINAL" | "PRE_FINAL" | string;
  number: number;
  date: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string | null;
  branch_name: string;
  module_name: string;
  type_name: string;
  creator_name: string;
  last_modifier_name: string;
  last_status_modifier_name: string;
  has_attachment: string;
  total_rows: number;
}

export interface VouchersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: VoucherItem[];
  additional_data: Record<string, any>;
}

export interface GetVouchersParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
  page?: number;
  pageSize?: number;
}