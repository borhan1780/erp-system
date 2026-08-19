import { useQuery } from "@tanstack/react-query";
import { getVouchers } from "../api/vouchers.api";
import type { GetVouchersParams } from "../types/vouchers.types";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "@/modules/dashboard/session";

export type UseVouchersOptions = Omit<
  GetVouchersParams,
  "companyId" | "ledgerId" | "periodId"
>;

export function useVouchers(options: UseVouchersOptions = { page: 1, pageSize: 5 }) {
  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();

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
      options,
    ],
    queryFn: () =>
      getVouchers({
        companyId: currentCompanyId!,
        ledgerId: currentLedgerId!,
        periodId: currentPeriodId!,
        ...options,
      }),
    enabled: isValid,
    staleTime: 0,
    refetchOnMount: "always",
  });
}