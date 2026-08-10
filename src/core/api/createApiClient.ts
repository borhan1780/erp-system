import ky from "ky";
import { apiConfig } from "./config";
import { apiModules, type ApiModule } from "./modules";
import { authStorage } from "@/core/security";

export function createApiClient(module: ApiModule) {
  return ky.create({
    prefix: `${apiConfig.baseURL}${apiModules[module]}`,
    credentials: "include",
    timeout: apiConfig.timeout,
    hooks: {
      beforeRequest: [
        ({ request }) => {
          const token = authStorage.getAccessToken();
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }

          const companyId = localStorage.getItem("session_company_id");
          const ledgerId = localStorage.getItem("session_ledger_id");
          const periodId = localStorage.getItem("session_period_id");
          const moduleId = localStorage.getItem("session_module_id");

          if (companyId) request.headers.set("X-Company-Id", companyId);
          if (ledgerId) request.headers.set("X-Ledger-Id", ledgerId);
          if (periodId) request.headers.set("X-Period-Id", periodId);
          if (moduleId) request.headers.set("X-Module-Id", moduleId);
        },
      ],
    },
  });
}