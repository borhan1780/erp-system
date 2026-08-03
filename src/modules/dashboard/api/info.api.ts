import { generalApi } from "@/core/api/client";

import type { InfoResponse } from "../types";

export async function getInfo(): Promise<InfoResponse> {
  return generalApi.get("domain/info/").json<InfoResponse>();
}
