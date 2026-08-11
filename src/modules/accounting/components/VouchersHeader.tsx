import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  RefreshRounded,
  MoreVertRounded,
  ContentCopyRounded,
  MenuBookRounded,
  SortRounded,
  SyncAltRounded,
} from "@mui/icons-material";

interface VouchersHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function VouchersHeader({ onRefresh, isRefreshing }: VouchersHeaderProps) {
  // state جهت مدیریت باز و بسته شدن منو
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        bgcolor: "#fff",
      }}
    >
      {/* سمت چپ: دکمه بروزرسانی و منوی سه نقطه */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Button
          variant="outlined"
          startIcon={< RefreshRounded />}
          
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

        <IconButton size="medium" onClick={handleClick}>
          <MoreVertRounded color="action" />
        </IconButton>

      <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  onClick={handleClose}
  transformOrigin={{ horizontal: "right", vertical: "top" }}
  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  slotProps={{
    paper: {
      elevation: 3,
      sx: {
        mt: 1,
        minWidth: 200,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  }}
>
  <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2 }}>
    <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
      <ContentCopyRounded color="primary" fontSize="small" />
    </ListItemIcon>
    <ListItemText
      primary={
        <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "right" }}>
          کپی در دوره مالی
        </Typography>
      }
    />
  </MenuItem>

  <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2 }}>
    <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
      <MenuBookRounded color="primary" fontSize="small" />
    </ListItemIcon>
    <ListItemText
      primary={
        <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "right" }}>
          ثبت نهایی اسناد
        </Typography>
      }
    />
  </MenuItem>

  <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2 }}>
    <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
      <SortRounded color="primary" fontSize="small" />
    </ListItemIcon>
    <ListItemText
      primary={
        <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "right" }}>
          مرتب‌سازی بر اساس تاریخ
        </Typography>
      }
    />
  </MenuItem>

  <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2 }}>
    <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
      <SyncAltRounded color="primary" fontSize="small" />
    </ListItemIcon>
    <ListItemText
      primary={
        <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "right" }}>
          تغییر وضعیت اسناد
        </Typography>
      }
    />
  </MenuItem>
</Menu>
      </Stack>

      {/* سمت راست: عنوان و مسیر صفحه */}
      <Stack spacing={0.5} sx={{ alignItems: "flex-end" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "text.primary" }}
        >
          اسناد حسابداری
        </Typography>

        <Breadcrumbs
          aria-label="breadcrumb"
          separator="/"
          sx={{
            fontSize: 13,
            color: "text.secondary",
            "& .MuiBreadcrumbs-separator": {
              mx: 0.8,
            },
          }}
        >
          <Link underline="hover" color="inherit" href="#">
            امور جاری
          </Link>
          <Typography
            color="text.primary"
            sx={{ fontSize: 13, fontWeight: 500 }}
          >
            اسناد حسابداری
          </Typography>
        </Breadcrumbs>
      </Stack>
    </Paper>
  );
}