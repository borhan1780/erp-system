import { useCallback, useMemo, useState, type ReactNode } from "react";

import type { AlertColor } from "@mui/material/Alert";

import { AppSnackbar } from "@/shared/components/AppSnackbar";

import { SnackbarContext } from "./SnackbarContext";
interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}




interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const show = useCallback((message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const notify = useMemo(
    () => ({
      success: (message: string) => show(message, "success"),

      error: (message: string) => show(message, "error"),

      warning: (message: string) => show(message, "warning"),

      info: (message: string) => show(message, "info"),
    }),
    [show],
  );

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <SnackbarContext.Provider value={{ notify }}>
      {children}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}
