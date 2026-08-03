import { createTheme } from "@mui/material/styles";

import { components } from "./overrides";
import { palette } from "./palette";
import { shape } from "./shape";
import { typography } from "./typography";

export const theme = createTheme({
  direction: "rtl",

  palette,

  typography,

  shape,

  components,
});
