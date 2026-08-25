export interface PaymentItem {
  id: string;
  date: string;
  serial: number;
  sum_pay_amount: number;
  sum_pay_cash_amount: number;
  sum_pay_check_amount: number;
  sum_spend_check_amount: number;
  sum_withdraw_amount: number;
  
  description: string;
  type: string;
  is_voucher_in_detail: boolean;
  voucher_id: string | null;
  cashier_period_id: string;
  branch_name: string;
  branch_code: string;
  branch_id: string;
  voucher_number: number | null;
  transaction_types: string;
  cashier_display_name: string;
  cashier_code: number;
  cashier_period_is_payment_authorization_required: boolean;
  cashier_period_is_active: boolean;
  cashier_period_contingent_cash: boolean;
  cashier_period_guarantee_document_cash: boolean;
  cashier_period_foreign_currency_cash: boolean;
  cashier_period_payable_check_cash: boolean;
  cashier_period_receivable_check_cash: boolean;
  cashier_period_max_payment_without_payment_authorization: number;
  cashier_period_remaining: number;
  total_cashier_period_amount_without_payment_authorization: number;
  total_rows: number;
  total_pay_amount: number;
  total_pay_cash_amount: number;
  total_pay_check_amount: number;
  total_spend_check_amount: number;
  total_withdraw_amount: number;
}

export interface PaymentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PaymentItem[];
}

export interface GetPaymentsParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
  page?: number;
  pageSize?: number;
}