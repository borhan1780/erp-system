import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderVouchersByDate } from "../api/voucherOrdering.api";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "@/modules/dashboard/session";

export function useOrderVouchers() {
  const queryClient = useQueryClient();
  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();

  return useMutation({
    mutationFn: () => {
      if (!currentCompanyId || !currentLedgerId || !currentPeriodId) {
        throw new Error("اطلاعات شرکت، دفتر یا دوره مالی انتخاب نشده است.");
      }

      return orderVouchersByDate({
        companyId: currentCompanyId,
        ledgerId: currentLedgerId,
        periodId: currentPeriodId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
}