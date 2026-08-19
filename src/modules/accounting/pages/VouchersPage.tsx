import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useVouchers } from "../hooks/useVouchers";
import { VouchersHeader } from "../components/VouchersHeader";
import type { FilterRow } from "../types/vouchers.types";
import { mapFiltersToQueryParams } from "../utils/voucherFilter.helper";
import { toJalaliDate } from "@/shared/utils/date";

export function VouchersPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [appliedFilters, setAppliedFilters] = useState<FilterRow[]>([]);

  // تبدیل ردیف‌های فیلتر به پارامترهای API
  const dynamicFilterParams = mapFiltersToQueryParams(appliedFilters);

  // فراخوانی هوک با ارسال آبجکت کامل
  const { data, isLoading, isError, refetch, isFetching } = useVouchers({
    page: page + 1,
    pageSize,
    ...dynamicFilterParams,
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApplyFilters = (filters: FilterRow[]) => {
    setAppliedFilters(filters);
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" sx={{ py: 4 }}>
        خطا در دریافت اطلاعات اسناد حسابداری.
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: "100%", height: "calc(100vh - 110px)" }}>
      {/* هدر صفحه */}
      <VouchersHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onApplyFilters={handleApplyFilters}
      />

      {/* بخش جدول */}
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <TableContainer sx={{ flex: 1, overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">ردیف</TableCell>
                <TableCell align="center">شماره</TableCell>
                <TableCell align="center">تاریخ سند</TableCell>
                <TableCell align="center">شرح</TableCell>
                <TableCell align="center">وضعیت</TableCell>
                <TableCell align="center">سریال</TableCell>
                <TableCell align="center">ماژول</TableCell>
                <TableCell align="center">نام شعبه</TableCell>
                <TableCell align="center">نوع</TableCell>
                <TableCell align="center">مبلغ</TableCell>
                <TableCell align="center">تاریخ ثبت</TableCell>
                <TableCell align="center">ضمیمه دارد</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results && data.results.length > 0 ? (
                data.results.map((voucher) => (
                  <TableRow hover key={voucher.id}>
                    <TableCell align="center">{voucher.row_number}</TableCell>
                    <TableCell align="center">{voucher.number}</TableCell>
                    <TableCell align="center">
                      {toJalaliDate(voucher.date)}
                    </TableCell>
                    <TableCell align="center">
                      {voucher.description || "-"}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          voucher.status === "DRAFT"
                            ? "پیش‌نویس"
                            : voucher.status === "PENDING"
                            ? "در انتظار تأیید"
                            : voucher.status === "FINAL"
                            ? "قطعی"
                            : "نامشخص"
                        }
                        color={
                          voucher.status === "DRAFT"
                            ? "default"
                            : voucher.status === "PENDING"
                            ? "warning"
                            : voucher.status === "FINAL"
                            ? "success"
                            : "default"
                        }
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{voucher.serial}</TableCell>
                    <TableCell align="center">{voucher.module_name}</TableCell>
                    <TableCell align="center">{voucher.branch_name}</TableCell>
                    <TableCell align="center">{voucher.type_name}</TableCell>
                    <TableCell align="center">
                      {voucher.amount.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      {toJalaliDate(voucher.created_at)}
                    </TableCell>
                    <TableCell align="center">
                      {voucher.has_attachment === "true" ? (
                        <CheckCircleRoundedIcon
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelRoundedIcon
                          color="error"
                          fontSize="small"
                          sx={{ opacity: 0.6 }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                      سندی برای نمایش یافت نشد.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.count ?? 0}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد در صفحه:"
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            "& .MuiTablePagination-actions": {
              direction: "ltr",
            },
          }}
          slotProps={{
            actions: {
              nextButton: {
                children: <KeyboardArrowLeft />,
              },
              previousButton: {
                children: <KeyboardArrowRight />,
              },
            },
          }}
        />
      </Paper>
    </Stack>
  );
}