import { useQuery } from "@tanstack/react-query";
import { getVouchers } from "../api/vouchers.api";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "@/modules/dashboard/session";

export function useVouchers(page = 1, pageSize = 5) {
  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();

  // بررسی معتبر بودن مقادیر شناسه (عدم ارسال درخواست با مقادیر پوچ)
  const isValid = Boolean(
    currentCompanyId &&
      currentCompanyId !== "null" &&
      currentLedgerId &&
      currentLedgerId !== "null" &&
      currentPeriodId &&
      currentPeriodId !== "null"
  );

  return useQuery({
    queryKey: [
      "vouchers",
      currentCompanyId,
      currentLedgerId,
      currentPeriodId,
      page,
      pageSize,
    ],
    queryFn: () =>
      getVouchers({
        companyId: currentCompanyId!,
        ledgerId: currentLedgerId!,
        periodId: currentPeriodId!,
        page,
        pageSize,
      }),
    enabled: isValid,
    staleTime: 0,
    refetchOnMount: "always"
  });
}