import { generalApi } from "@/core/api/client";

export interface LogoutResponse {
  message: string;
  access: boolean;
  refresh: boolean;
}

export async function logout(): Promise<LogoutResponse> {
  return generalApi.post("auth/logout/").json<LogoutResponse>();
}
