import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import type { PaymentItem } from "../types/payment.types";
import { toJalaliDate } from "@/shared/utils/date";
import { useNavigate } from "react-router-dom";
interface PaymentsTableProps {
  items: PaymentItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPageSize: number) => void;
}

export function PaymentsTable({
  items,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onRowsPerPageChange,
}: PaymentsTableProps) {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const navigate = useNavigate();

  return (
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
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {/* ستون عملیات سطرها */}
              <TableCell align="center" sx={{ width: 130 }}>

              </TableCell>
              <TableCell align="center">سریال</TableCell>
              <TableCell align="center">تاریخ</TableCell>
              <TableCell align="center">صندوق‌دار</TableCell>
              <TableCell align="center">شعبه</TableCell>
              <TableCell align="center">شرح</TableCell>
              <TableCell align="center">مبلغ کل پرداختی</TableCell>
              <TableCell align="center">پرداخت نقدی</TableCell>
              <TableCell align="center">پرداخت چک</TableCell>
              <TableCell align="center">شماره سند</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((payment) => (
                <TableRow hover key={payment.id}>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {}}
                        sx={{ color: "primary.main" }}
                      >
                        <MoreVertRounded fontSize="small" />
                      </IconButton>

                      <Button
                        variant="outlined"
                        size="small"
                          onClick={() => navigate(`/current-affairs/payment-transactions/${payment.id}/items`)}                        sx={{
                          fontSize: "0.75rem",
                          py: 0.2,
                          px: 1,
                          minWidth: "auto",
                          borderRadius: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        آیتم‌ها
                      </Button>
                    </Stack>
                  </TableCell>

                  <TableCell align="center">{payment.serial}</TableCell>
                  <TableCell align="center">{toJalaliDate(payment.date)}</TableCell>
                  <TableCell align="center">{payment.cashier_display_name}</TableCell>
                  <TableCell align="center">{payment.branch_name}</TableCell>
                  <TableCell align="center">{payment.description || "-"}</TableCell>
                  <TableCell align="center">
                    {payment.sum_pay_amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {payment.sum_pay_cash_amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {payment.sum_pay_check_amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{payment.voucher_number || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                    رکوردی برای پرداخت یافت نشد.
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
        count={totalCount}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="تعداد در صفحه:"
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          direction: "ltr",
        }}
      />
    </Paper>
  );
}