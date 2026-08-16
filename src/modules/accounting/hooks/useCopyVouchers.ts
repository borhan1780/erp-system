import { useMutation, useQueryClient } from "@tanstack/react-query";
import { copyVouchersToPeriod } from "../api/voucherCopy.api";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "@/modules/dashboard/session";

export function useCopyVouchers() {
  const queryClient = useQueryClient();
  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();

  return useMutation({
    mutationFn: (targetPeriodId: string) => {
      if (!currentCompanyId || !currentLedgerId || !currentPeriodId) {
        throw new Error("اطلاعات شرکت، دفتر یا دوره مالی انتخاب نشده است.");
      }

      return copyVouchersToPeriod({
        companyId: currentCompanyId,
        ledgerId: currentLedgerId,
        periodId: currentPeriodId,
        targetPeriodId,
      });
    },
    onSuccess: () => {
      // رفرش کردن خودکار لیست اسناد حسابداری بعد از انجام موفق کپی
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
}