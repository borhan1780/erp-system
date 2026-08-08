import { generalApi } from "@/core/api/client";
import type { MenuItemType, GetMenuParams, MenuRawResponse } from "../types/menu.types";

export async function getMenu(params: GetMenuParams): Promise<MenuItemType[]> {
  const { companyId, moduleId } = params;

  const searchParams: Record<string, string> = {};
  if (moduleId) {
    searchParams.module_id = String(moduleId);
  }

  const response = await generalApi
    .get(`modules/companies/${companyId}/menu/`, { searchParams })
    .json<MenuRawResponse>();

  if (Array.isArray(response)) {
    return response;
  }

  if (response && typeof response === "object") {
    if ("name_fa" in response || "id" in response){
      return [response as MenuItemType];
    }

    if ("items" in response && Array.isArray(response.items)){
      return response.items;
    }
  }

  return[]

}