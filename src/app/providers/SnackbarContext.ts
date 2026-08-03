import { createContext } from "react";

export interface SnackbarContextValue {
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
  };
}

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);
