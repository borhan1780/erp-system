import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { usePeriods } from "@/modules/dashboard/hooks/usePeriods";
import { useCurrentCompany } from "@/modules/dashboard/session";
import { useCopyVouchers } from "../hooks/useCopyVouchers";

interface CopyVouchersDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CopyVouchersDialog({ open, onClose }: CopyVouchersDialogProps) {
  const { currentCompanyId } = useCurrentCompany();
  const { data: periods, isLoading: isLoadingPeriods } = usePeriods(currentCompanyId);
  const { mutate: copyVouchers, isPending: isCopying } = useCopyVouchers();

  const [selectedPeriodId, setSelectedPeriodId] = useState<string>("");

  const handleClose = () => {
    if (isCopying) return;
    setSelectedPeriodId("");
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedPeriodId) return;

    copyVouchers(selectedPeriodId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const availablePeriods = Array.isArray(periods) ? periods : [];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      {/* هدر ساده */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          کپی در دوره مالی
        </Typography>
        <IconButton size="small" onClick={handleClose} disabled={isCopying}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* بدنه و انتخاب‌گر */}
      <DialogContent sx={{ py: 1.5 }}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            لطفاً دوره مالی مقصد را جهت کپی اسناد انتخاب کنید:
          </Typography>

          <FormControl fullWidth size="small" disabled={isLoadingPeriods || isCopying}>
            <InputLabel id="target-period-select-label">دوره مالی مقصد</InputLabel>
            <Select
              labelId="target-period-select-label"
              value={selectedPeriodId}
              label="دوره مالی مقصد"
              onChange={(e) => setSelectedPeriodId(e.target.value)}
            >
              {isLoadingPeriods ? (
                <MenuItem disabled>
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                  در حال بارگذاری...
                </MenuItem>
              ) : availablePeriods.length > 0 ? (
                availablePeriods.map((item: any) => {
                  const periodId = item?.period?.id || item?.id;
                  const periodName = item?.period?.name || item?.name || "بدون عنوان";
                  return (
                    <MenuItem key={item.id} value={periodId}>
                      {periodName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>دوره‌ای یافت نشد</MenuItem>
              )}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      {/* دکمه‌های تایید و انصراف */}
      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button
          onClick={handleClose}
          disabled={isCopying}
          color="inherit"
          sx={{ fontWeight: 600 }}
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedPeriodId || isCopying}
          sx={{ fontWeight: 600, minWidth: 80 }}
        >
          {isCopying ? <CircularProgress size={20} color="inherit" /> : "تایید"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}