export interface PaymentItem {
  id: string;
  date: string;
  serial: number;
  sum_pay_amount: number;
  sum_pay_cash_amount: number;
  sum_pay_check_amount: number;
  sum_spend_check_amount: number;
  sum_withdraw_amount: number;
  cashier_foreign_currency_slave_account_title: string | null;
  cashier_foreign_currency_slave_account_code: string | null;
  cashier_foreign_currency_slave_account_company_id: string | null;
  cashier_foreign_currency_slave_account_company_float_types: string | null;
  cashier_foreign_currency_master_account_title: string | null;
  cashier_foreign_currency_master_account_code: string | null;
  cashier_foreign_currency_master_account_id: string | null;
  cashier_foreign_currency_slave2_account_title: string | null;
  cashier_foreign_currency_slave2_account_code: string | null;
  cashier_foreign_currency_slave3_account_title: string | null;
  cashier_foreign_currency_slave3_account_code: string | null;
  cashier_guarantee_document_slave_account_title: string | null;
  cashier_guarantee_document_slave_account_code: string | null;
  cashier_guarantee_document_slave_account_company_id: string | null;
  cashier_guarantee_document_slave_account_company_float_types: string | null;
  cashier_guarantee_document_master_account_title: string | null;
  cashier_guarantee_document_master_account_code: string | null;
  cashier_guarantee_document_master_account_id: string | null;
  cashier_guarantee_document_slave2_account_title: string | null;
  cashier_guarantee_document_slave2_account_code: string | null;
  cashier_guarantee_document_slave3_account_title: string | null;
  cashier_guarantee_document_slave3_account_code: string | null;
  cashier_payable_check_slave_account_title: string | null;
  cashier_payable_check_slave_account_code: string | null;
  cashier_payable_check_slave_account_company_id: string | null;
  cashier_payable_check_slave_account_company_float_types: string | null;
  cashier_payable_check_master_account_title: string | null;
  cashier_payable_check_master_account_code: string | null;
  cashier_payable_check_master_account_id: string | null;
  cashier_payable_check_slave2_account_title: string | null;
  cashier_payable_check_slave2_account_code: string | null;
  cashier_payable_check_slave3_account_title: string | null;
  cashier_payable_check_slave3_account_code: string | null;
  cashier_receivable_check_slave_account_title: string | null;
  cashier_receivable_check_slave_account_code: string | null;
  cashier_receivable_check_slave_account_company_id: string | null;
  cashier_receivable_check_slave_account_company_float_types: string | null;
  cashier_receivable_check_master_account_title: string | null;
  cashier_receivable_check_master_account_code: string | null;
  cashier_receivable_check_master_account_id: string | null;
  cashier_receivable_check_slave2_account_title: string | null;
  cashier_receivable_check_slave2_account_code: string | null;
  cashier_receivable_check_slave3_account_title: string | null;
  cashier_receivable_check_slave3_account_code: string | null;
  cashier_rial_slave_account_title: string | null;
  cashier_rial_slave_account_code: number | null;
  cashier_rial_slave_account_company_id: string | null;
  cashier_rial_slave_account_company_float_types: string | null;
  cashier_rial_master_account_title: string | null;
  cashier_rial_master_account_code: number | null;
  cashier_rial_master_account_id: string | null;
  cashier_rial_slave2_account_title: string | null;
  cashier_rial_slave2_account_code: string | null;
  cashier_rial_slave3_account_title: string | null;
  cashier_rial_slave3_account_code: string | null;
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
  additional_data: Record<string, any>;
}

export interface GetPaymentsParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
  page?: number;
  pageSize?: number;
  [key: string]: any;
}

export interface PaymentFlatItem {
  id: string;
  serial: number;
  date: string;
  transaction_id: string;
  transaction_type: string;
  debit: number;
  description: string | null;
  voucher_number: number | null;
  voucher_id: string | null;
  slave_title: string;
  slave_code: number;
  person_display_name: string;
  person_code: number;
  currency_name: string;
  branch_id: string;
  branch_name: string;
  branch_code: string;
  pay_to: string | null;
  cashier_display_name: string;
  cashier_code: number;
  cashier_rial_slave_account_title: string | null;
  cashier_rial_master_account_title: string | null;
  type: string;
  is_voucher_in_detail: boolean;
  total_rows: number;
  total_debit: number;
}

export interface PaymentFlatItemsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PaymentFlatItem[];
  additional_data: Record<string, any>;
}

export interface GetPaymentFlatItemsParams {
  companyId: string;
  ledgerId: string;
  periodId: string;
  transactionId: string;
  page?: number;
  pageSize?: number;
}