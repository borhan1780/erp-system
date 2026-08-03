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

  // شرط ارسال درخواست: داشتن companyId و در حالت MODULAR داشتن currentModuleId
  const canFetch =
    Boolean(currentCompanyId) && (!isModular || Boolean(currentModuleId));

  const query = useQuery({
    queryKey: [
      "menu",
      me?.app_mode,
      currentCompanyId,
      isModular ? currentModuleId : "TREE",
    ],
    queryFn: () =>
      getMenu({
        companyId: currentCompanyId!,
        moduleId: isModular ? currentModuleId : undefined,
      }),
    enabled: Boolean(me) && canFetch,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    isModular,
    isLoading: isMeLoading || query.isLoading,
  };
}
