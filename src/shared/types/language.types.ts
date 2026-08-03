export type LanguageDirection = "RTL" | "LTR";

export interface Language {
  id: string;
  name: string;
  code: string;
  direction: LanguageDirection;
  country_code: string;
}
