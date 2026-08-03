import ky from "ky";

import { apiConfig } from "./config";
import { apiModules, type ApiModule } from "./modules";

export function createApiClient(module: ApiModule) {
  return ky.create({
    prefix: `${apiConfig.baseURL}${apiModules[module]}`,

    credentials: "include",

    timeout: apiConfig.timeout,
  });
}
