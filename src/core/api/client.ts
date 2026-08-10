import ky from "ky";
import { apiConfig } from "./config";
import { createApiClient } from "./createApiClient";
import { authStorage } from "@/core/security";

export const generalApi = createApiClient("general");
export const accountingApi = createApiClient("accounting");
export const warehouseApi = createApiClient("warehouse");
export const treasuryApi = createApiClient("treasury");
export const hcmApi = createApiClient("hcm");

export const apiClient = ky.create({
  prefix: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  credentials: "include",
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = authStorage.getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});