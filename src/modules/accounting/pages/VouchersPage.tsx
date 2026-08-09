import {
  Paper,
  Typography,
  Box,
  Breadcrumbs,
  Button,
  IconButton,
} from "@mui/material";
import { AutorenewRounded, MoreVertRounded } from "@mui/icons-material";

export function VouchersPage() {
  const handleRefresh = () => {
    console.log("بروزرسانی اسناد حسابداری...");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* هدر بالای صفحه */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          pb: 2,
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
        }}
      >
        {/* سمت راست: عنوان و مسیر صفحه (Breadcrumbs) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "right",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 0.5, color: "#1e293b" }}
          >
            اسناد حسابداری
          </Typography>

          <Breadcrumbs
            aria-label="breadcrumb"
            separator="/"
            sx={{
              fontSize: "0.85rem",
              direction: "rtl",
              "& .MuiBreadcrumbs-separator": {
                mx: 0.8,
              },
            }}
          >
            <Typography
              color="text.primary"
              sx={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              اسناد حسابداری
            </Typography>
            <Typography
              color="text.primary"
              sx={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              امور جاری
            </Typography>
            <Typography
              color="text.primary"
              sx={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              حسابداری
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* سمت چپ: دکمه بروزرسانی و آیکون سه‌نقطه */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleRefresh}
            startIcon={<AutorenewRounded fontSize="small" />}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 0.75,
              borderColor: "#0284c7",
              color: "#0284c7",
              fontSize: "0.85rem",
              fontWeight: 600,
              "&:hover": { borderColor: "#0369a1", bgcolor: "#f0f9ff" },
            }}
          >
            بروزرسانی
          </Button>
          <IconButton size="small" sx={{ color: "#64748b" }}>
            <MoreVertRounded />
          </IconButton>
        </Box>
      </Box>

      {/* کارت اصلی محتوا */}
      <Paper sx={{p: 3, borderRadius: 3, textAlign: "right",}}>
        <Typography variant="body2" color="text.secondary">
          محتوای جدول اسناد حسابداری در این بخش قرار می‌گیرد.
        </Typography>
      </Paper>
    </Box>
  );
}