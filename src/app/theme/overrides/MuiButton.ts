export const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: 12,
      minHeight: 44,
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "none",

      "&:hover": {
        boxShadow: "none",
      },
    },
  },

  defaultProps: {
    disableElevation: true,
  },
};
