import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../api/payment.api";
import type { GetPaymentsParams } from "../types/payment.types";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "@/modules/dashboard/session";

export type UsePaymentsOptions = Pick<
  GetPaymentsParams,
  "page" | "pageSize" 
>;

export function usePayments(options: UsePaymentsOptions = { page: 1, pageSize: 30 }) {
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
      "payments",
      currentCompanyId,
      currentLedgerId,
      currentPeriodId,
      options,
    ],
    queryFn: () =>
      getPayments({
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