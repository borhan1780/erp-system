import type { PropsWithChildren } from "react";

import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import { SnackbarProvider } from "./SnackbarProvider";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
