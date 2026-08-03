import type { z } from "zod";

import { loginSchema } from "../schemas/login.schema";

export type LoginRequest = z.infer<typeof loginSchema>;

export interface LoginResponse {
  message: string;

  access_token: string;
  refresh_token: string;

  user_id: string;
  username: string;
  display_name: string;

  is_superuser: boolean;

  font_family: string;
  font_size: number;

  language: {
    id: string;
    name: string;
    code: string;
    direction: "RTL" | "LTR";
    country_code: string;
  };

  new_tab: boolean;

  last_login: string;
}
