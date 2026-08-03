import ky from "ky";
import { apiConfig } from "./config";
import { createApiClient } from "./createApiClient";

export const generalApi = createApiClient("general");

export const accountingApi = createApiClient("accounting");

export const warehouseApi = createApiClient("warehouse");

export const treasuryApi = createApiClient("treasury");

export const hcmApi = createApiClient("hcm");

console.log(apiConfig.baseURL);

export const apiClient = ky.create({
  prefix: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  credentials: "include",
});
