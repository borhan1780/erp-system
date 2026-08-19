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
  FilterListRounded,
  ContentCopyRounded,
  MenuBookRounded,
  SortRounded,
  SyncAltRounded,
} from "@mui/icons-material";
import { CopyVouchersDialog } from "./CopyVouchersDialog";
import { OrderVouchersDialog } from "./OrderVouchersDialog";
import { VouchersFilterPopover } from "./VouchersFilterPopover";
import type { FilterRow } from "../types/vouchers.types";

interface VouchersHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  onApplyFilters?: (filters: FilterRow[]) => void;
}

export function VouchersHeader({
  onRefresh,
  isRefreshing,
  onApplyFilters,
}: VouchersHeaderProps) {
  const [anchorElMenu , setAnchorElMenu] = useState<null | HTMLElement>(null);
  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);

  const [openCopyDialog, setOpenCopyDialog] = useState(false);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);

  const openMenu = Boolean(anchorElMenu);
  const openFilter = Boolean(anchorElFilter);

  return (
    <>
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
        {/* سمت چپ: دکمه بروزرسانی، آیکون فیلتر و منوی سه‌نقطه */}
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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

          <IconButton
            size="medium"
            onClick={(e) => setAnchorElFilter(e.currentTarget)}
            color={openFilter ? "primary" : "default"}
          >
            <FilterListRounded color={openFilter ? "primary" : "action"} />
          </IconButton>

          <IconButton
            size="medium"
            onClick={(e) => setAnchorElMenu(e.currentTarget)}
          >
            <MoreVertRounded color="action" />
          </IconButton>

          <Menu
            anchorEl={anchorElMenu}
            open={openMenu}
            onClose={() => setAnchorElMenu(null)}
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
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorElMenu(null);
                setOpenCopyDialog(true);
              }}
              sx={{ py: 1.2, px: 2 }}
            >
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

            <MenuItem onClick={() => setAnchorElMenu(null)} sx={{ py: 1.2, px: 2 }}>
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

            <MenuItem
              onClick={() => {
                setAnchorElMenu(null);
                setOpenOrderDialog(true);
              }}
              sx={{ py: 1.2, px: 2 }}
            >
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

            <MenuItem onClick={() => setAnchorElMenu(null)} sx={{ py: 1.2, px: 2 }}>
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

        {/* سمت راست: عنوان و Breadcrumbs */}
        <Stack spacing={0.5} sx={{ alignItems: "flex-end" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
            اسناد حسابداری
          </Typography>

          <Breadcrumbs
            aria-label="breadcrumb"
            separator="/"
            sx={{
              fontSize: 13,
              color: "text.secondary",
              "& .MuiBreadcrumbs-separator": { mx: 0.8 },
            }}
          >
            <Link underline="hover" color="inherit" href="#">
              امور جاری
            </Link>
            <Typography color="text.primary" sx={{ fontSize: 13, fontWeight: 500 }}>
              اسناد حسابداری
            </Typography>
          </Breadcrumbs>
        </Stack>
      </Paper>

      {/* دیالوگ‌های کپی و مرتب‌سازی */}
      <CopyVouchersDialog
        open={openCopyDialog}
        onClose={() => setOpenCopyDialog(false)}
      />
      <OrderVouchersDialog
        open={openOrderDialog}
        onClose={() => setOpenOrderDialog(false)}
      />

      {/* پاپ‌اور فیلترها */}
      <VouchersFilterPopover
        anchorEl={anchorElFilter}
        open={openFilter}
        onClose={() => setAnchorElFilter(null)}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
}