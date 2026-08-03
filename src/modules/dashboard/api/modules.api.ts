import { generalApi } from "@/core/api/client";

import type { ModulesResponse } from "../types";

export async function getModules(): Promise<ModulesResponse> {
  return generalApi.get("users/companies/modules/").json<ModulesResponse>();
}
