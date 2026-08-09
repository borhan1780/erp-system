import { useQuery } from "@tanstack/react-query";
import { useMe } from "@/modules/dashboard/hooks/useMe";
import { useCurrentCompany } from "@/modules/dashboard/session/useCurrentCompany";
import { useCurrentModule } from "@/modules/dashboard/session/useCurrentModule";
import { getMenu } from "../api/menu.api";

export function useMenu() {
  const { data: me, isLoading: isMeLoading } = useMe();
  const { currentCompanyId } = useCurrentCompany();
  const { currentModuleId } = useCurrentModule();

  const isModular = me?.app_mode === "MODULAR";

  // شرط قطعی برای ارسال درخواست: 
  // companyId حتماً باید وجود داشته باشد و مقدار string معتبر باشد (نه undefined یا empty)
  const hasValidCompany = Boolean(currentCompanyId) && currentCompanyId !== "undefined";
  const hasValidModule = !isModular || (Boolean(currentModuleId) && String(currentModuleId) !== "undefined");

  const canFetch = hasValidCompany && hasValidModule;

  const query = useQuery({
    queryKey: [
      "menu",
      me?.app_mode,
      currentCompanyId,
      isModular ? currentModuleId : "TREE",
    ],
    queryFn: () => {
      if (!currentCompanyId) throw new Error("Company ID is missing");
      return getMenu({
        companyId: currentCompanyId,
        moduleId: isModular ? currentModuleId : undefined,
      });
    },
    // درخواست فقط زمانی ارسال می‌شود که تمام آیدی‌های مورد نیاز معتبر باشند
    enabled: Boolean(me) && canFetch,
    staleTime: 5 * 60 * 1000, // ۵ دقیقه Cache باقی می‌ماند تا هنگام برگشت به صفحه نیاز به ریکوئست مجدد نباشد
  });

  return {
    ...query,
    isModular,
    isLoading: isMeLoading || query.isLoading,
  };
}