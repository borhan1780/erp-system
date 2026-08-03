import { authStorage } from "./auth-storage";

export function isAuthenticated() {
  return !!authStorage.getAccessToken();
}
