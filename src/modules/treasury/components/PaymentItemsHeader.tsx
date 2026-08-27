import { Paper, Typography, Button, Stack } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
interface PaymentItemsHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function PaymentItemsHeader({
  onRefresh,
  isRefreshing,
}: PaymentItemsHeaderProps) {
  const navigate = useNavigate();

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
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 600 }}
        >
          بازگشت
        </Button>

        <Button
          variant="outlined"
          startIcon={<RefreshRounded />}
          onClick={onRefresh}
          disabled={isRefreshing}
          sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 600 }}
        >
           بروزرسانی   
        </Button>
      </Stack>

      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        آیتم‌های پرداخت
      </Typography>
    </Paper>
  );
}