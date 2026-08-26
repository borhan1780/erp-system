import { Paper, Typography, Button } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";

interface PaymentsHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function PaymentsHeader({
  onRefresh,
  isRefreshing,
}: PaymentsHeaderProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<RefreshRounded />}
        onClick={onRefresh}
        disabled={isRefreshing}
        size="medium"
        sx={{
          borderRadius: 2.5,
          px: 2.5,
          py: 0.8,
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        بروزرسانی
      </Button>

      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        اسناد پرداخت
      </Typography>
    </Paper>
  );
}