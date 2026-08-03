import MuiAlert, { type AlertColor } from "@mui/material/Alert";
import MuiSnackbar from "@mui/material/Snackbar";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
  onClose: () => void;
}

export function AppSnackbar({
  open,
  message,
  severity,
  autoHideDuration = 4000,
  onClose,
}: AppSnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;

        onClose();
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={onClose}
        sx={{
          minWidth: 320,
          borderRadius: 2,
        }}
      >
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
