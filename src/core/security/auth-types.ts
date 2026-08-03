export interface AuthTokens {
  accessToken: string;
}

export interface Language {
  id: string;
  name: string;
  code: string;
  direction: "RTL" | "LTR";
  country_code: string;
}

export interface AuthUser {
  user_id: string;
  username: string;
  display_name: string;

  is_superuser: boolean;

  font_family: string;
  font_size: number;

  language: Language;

  new_tab: boolean;

  last_login: string;
}
