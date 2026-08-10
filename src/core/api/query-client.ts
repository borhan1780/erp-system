import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // دیتا به مدت ۱۵ دقیقه تازه مانده و از Cache خوانده می‌شود
      gcTime: 1000 * 60 * 60, // ماندگاری دیتای کش‌شده در حافظه به مدت ۱ ساعت
      refetchOnMount: false, // جلوگیری از ارسال درخواست مجدد هنگام بازگشت به صفحه
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});