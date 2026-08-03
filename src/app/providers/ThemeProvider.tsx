import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";

import { rtlCache } from "@/app/rtl/cache";
import { theme } from "@/app/theme";

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <CacheProvider value={rtlCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
