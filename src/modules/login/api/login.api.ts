import { generalApi } from "@/core/api/client";

import type { LoginRequest, LoginResponse } from "./login.types";

export async function login(body: LoginRequest): Promise<LoginResponse> {
  return generalApi
    .post("auth/login/", {
      json: body,
    })
    .json<LoginResponse>();
}
