import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useOrderVouchers } from "../hooks/useOrderVouchers";

interface OrderVouchersDialogProps {
  open: boolean;
  onClose: () => void;
}

export function OrderVouchersDialog({ open, onClose }: OrderVouchersDialogProps) {
  const { mutate: orderVouchers, isPending } = useOrderVouchers();

  const handleConfirm = () => {
    orderVouchers(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => !isPending && onClose()}
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
      {/* هدر ساده با دکمه بستن */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          مرتب‌سازی بر اساس تاریخ
        </Typography>
        <IconButton size="small" onClick={onClose} disabled={isPending}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* متن پیام */}
      <DialogContent sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          آیا از مرتب‌سازی اسناد بر اساس تاریخ اطمینان دارید؟
        </Typography>
      </DialogContent>

      {/* دکمه‌های تایید و انصراف */}
      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button
          onClick={onClose}
          disabled={isPending}
          color="inherit"
          sx={{ fontWeight: 600 }}
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={isPending}
          sx={{ fontWeight: 600, minWidth: 90 }}
        >
          {isPending ? <CircularProgress size={20} color="inherit" /> : "تایید"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}