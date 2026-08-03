import { generalApi } from "@/core/api/client";


import type { MeResponse } from "../types";

export async function getMe(): Promise<MeResponse> {
  return generalApi.get("users/me/").json<MeResponse>();
}
