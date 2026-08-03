import { generalApi } from "@/core/api/client";
import type { MenuItemType, GetMenuParams } from "../types/menu.types";

export async function getMenu(params: GetMenuParams): Promise<MenuItemType[]> {
  const { companyId, moduleId } = params;

  const searchParams: Record<string, string> = {};

  if (moduleId) {
    searchParams.module_id = String(moduleId);
  }

  // ساخت آدرس دقیقاً مطابق الگوی صحیح سرور شما:
  // modules/companies/{companyId}/menu/
  return generalApi
    .get(`modules/companies/${companyId}/menu/`, { searchParams })
    .json<MenuItemType[]>();
}
