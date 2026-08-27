import { useQuery } from "@tanstack/react-query";
import { getPaymentFlatItems } from "../api/payment.api";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "@/modules/dashboard/session";

interface UsePaymentFlatItemsOptions {
  transactionId?: string;
  page?: number;
  pageSize?: number;
}

export function usePaymentFlatItems({
  transactionId,
  page = 1,
  pageSize = 30,
}: UsePaymentFlatItemsOptions) {
  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();

  const isValid = Boolean(
    currentCompanyId &&
      currentCompanyId !== "null" &&
      currentLedgerId &&
      currentLedgerId !== "null" &&
      currentPeriodId &&
      currentPeriodId !== "null" &&
      transactionId
  );

  return useQuery({
    queryKey: [
      "paymentFlatItems",
      currentCompanyId,
      currentLedgerId,
      currentPeriodId,
      transactionId,
      page,
      pageSize,
    ],
    queryFn: () =>
      getPaymentFlatItems({
        companyId: currentCompanyId!,
        ledgerId: currentLedgerId!,
        periodId: currentPeriodId!,
        transactionId: transactionId!,
        page,
        pageSize,
      }),
    enabled: isValid,
    staleTime: 0,
    refetchOnMount: "always",
  });
}