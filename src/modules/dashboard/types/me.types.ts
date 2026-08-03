import type { Language } from "@/shared/types/language.types";

export interface MeResponse {
  id: string;
  display_name: string;
  username: string;

  language: Language;

  auth_send_type: string;

  is_superuser: boolean;
  is_active: boolean;
  new_tab: boolean;

  last_login: string;
  created_at: string;

  access_start_time: string;
  access_end_time: string;
  expire_date: string;

  allowed_ips: string;

  signature: string;

  dialog_transition_type: string;
  dialog_duration: string;

  app_mode: string;
}
