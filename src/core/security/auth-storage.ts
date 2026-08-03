import type { AuthTokens } from "./auth-types";

let authTokens: AuthTokens | null = null;

export const authStorage = {
  getAccessToken(): string | null {
    return authTokens?.accessToken ?? null;
  },

  setAccessToken(accessToken: string): void {
    authTokens = {
      accessToken,
    };
  },

  clear(): void {
    authTokens = null;
  },
};
