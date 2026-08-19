export interface VoucherItem {
  row_number: number;
  id: string;
  id_initial: string;
  serial: number;
  status: "FINAL" | "PRE_FINAL" | "DRAFT" | "PENDING" | string;
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

// ساختار ردیف‌های فیلتر
export interface FilterRow {
  id: string;
  column: "number" | "date" | "description";
  operator: string;
  value: string;
  secondValue?: string;
}

// پارامترهای ارسالی به API
export interface GetVouchersParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
  page?: number;
  pageSize?: number;
  number?: string | number;
  from_number?: string | number;
  to_number?: string | number;
  date?: string;
  from_date?: string;
  to_date?: string;
  description?: string;
}