import type { Currency } from "@/shared/types/currency.types";
import type { Language } from "@/shared/types/language.types";

export interface InfoResponse {
  hostname: string;
  holding: string;

  language: Language;

  password_level: string;

  auth_send_type: string;

  api_key: string;

  template: string;

  auth_method: string;

  max_failed_login_attempts: number;

  block_duration: string;

  sender_number: string;

  allowed_ips: string;

  default_currency: Currency;

  architecture_type: string;

  allow_multiple_sessions: boolean;
}
