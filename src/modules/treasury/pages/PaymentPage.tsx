import { useState } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { usePayments } from "../hooks/usePayments";
import { PaymentsHeader } from "../components/PaymentsHeader";
import { PaymentsTable } from "../components/PaymentsTable";

export function PaymentPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);

  const { data, isLoading, isError, refetch, isFetching } = usePayments({
    page: page +1,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  if (isFetching) {
    return(
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
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
        خطا در دریافت اطلاعات پرداخت‌ها.
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: "100%", height: "calc(100vh - 110px)", p: 2 }}>
      <PaymentsHeader onRefresh={refetch} isRefreshing={isFetching} />

      <PaymentsTable
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