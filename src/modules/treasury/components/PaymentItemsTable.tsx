import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  Checkbox,
} from "@mui/material";
import type { PaymentFlatItem } from "../types/payment.types";
import { toJalaliDate } from "@/shared/utils/date";

interface PaymentItemsTableProps {
  items: PaymentFlatItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPageSize: number) => void;
}

function getTransactionTypeLabel(type: string): string {
  switch (type) {
    case "PAY_CASH":
      return "پرداخت نقد";
    case "PAY_CHECK":
      return "پرداخت چک";
    case "SPEND_CHECK":
      return "خرج چک";
    case "PAY_WITHDRAW":
      return "برداشت";
    default:
      return type || "-";
  }
}

export function PaymentItemsTable({
  items,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onRowsPerPageChange,
}: PaymentItemsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(items.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const totalDebitFromApi = items[0]?.total_debit ?? 0;

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
      <TableContainer
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Table stickyHeader size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center">
                <Checkbox
                  size="small"
                  checked={isAllSelected}
                  indeterminate={
                    selectedIds.length > 0 && selectedIds.length < items.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell align="center">کد صندوق‌دار</TableCell>
              <TableCell align="center">نام صندوق‌دار</TableCell>
              <TableCell align="center">شماره رسید</TableCell>
              <TableCell align="center">تاریخ عملیات</TableCell>
              <TableCell align="center">نوع پرداخت</TableCell>
              <TableCell align="center">مبلغ</TableCell>
              <TableCell align="center">شماره سند</TableCell>
              <TableCell align="center">سرفصل حساب بدهکار</TableCell>
              <TableCell align="center">کد شخص</TableCell>
              <TableCell align="center">نام شخص</TableCell>
              <TableCell align="center">نام ارز</TableCell>
              <TableCell align="center">بابت</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length > 0 ? (
              items.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const slaveAccount =
                  item.slave_code && item.slave_title
                    ? `${item.slave_code} - ${item.slave_title}`
                    : item.slave_title || "-";

                return (
                  <TableRow hover key={item.id} selected={isSelected}>
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </TableCell>
                    <TableCell align="center">{item.cashier_code}</TableCell>
                    <TableCell align="center">
                      {item.cashier_display_name || "-"}
                    </TableCell>
                    <TableCell align="center">{item.serial}</TableCell>
                    <TableCell align="center">
                      {toJalaliDate(item.date)}
                    </TableCell>
                    <TableCell align="center">
                      {getTransactionTypeLabel(item.transaction_type)}
                    </TableCell>
                    <TableCell align="center">
                      {item.debit?.toLocaleString() || "0"}
                    </TableCell>
                    <TableCell align="center">
                      {item.voucher_number || "-"}
                    </TableCell>
                    <TableCell align="center">{slaveAccount}</TableCell>
                    <TableCell align="center">
                      {item.person_code || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.person_display_name || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.currency_name || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.description || item.pay_to || "-"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={13} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                    آیتمی برای این سند پرداخت یافت نشد.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* فوتر چسبیده به کف کانتینر */}
        {items.length > 0 && (
          <Table size="small" sx={{ minWidth: 1200, mt: "auto" }}>
            <TableFooter
              sx={{
                bgcolor: "#BFD4E6",
                "& td": {
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#1c3d5a",
                  borderColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <TableRow>
                <TableCell colSpan={6} />
                <TableCell align="center">0</TableCell>
                <TableCell colSpan={6} />
              </TableRow>

              <TableRow>
                <TableCell colSpan={6} />
                <TableCell align="center">
                  {totalDebitFromApi.toLocaleString()}
                </TableCell>
                <TableCell colSpan={6} />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 30, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
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