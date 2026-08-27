import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { usePaymentFlatItems } from "../hooks/usePaymentFlatItems";
import { PaymentItemsHeader } from "../components/PaymentItemsHeader";
import { PaymentItemsTable } from "../components/PaymentItemsTable";

export function PaymentItemsPage() {
  const { transactionId } = useParams<{ transactionId: string }>();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);

  const { data, isLoading, isError, refetch, isFetching } = usePaymentFlatItems({
    transactionId,
    page: page + 1,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newPageSize: number) => {
    setPageSize(newPageSize);
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
      <Typography color="error" align="center" dir="rtl" sx={{ py: 4 }}>
        خطا در دریافت آیتم‌های پرداخت.
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: "100%", height: "calc(100vh - 110px)", p: 2 }}>
      <PaymentItemsHeader onRefresh={refetch} isRefreshing={isFetching} />

      <PaymentItemsTable
        items={data?.results ?? []}
        totalCount={data?.count ?? 0}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  );
}