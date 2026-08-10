const TOKEN_KEY = "access_token";

export const authStorage = {
  getAccessToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);

    // بررسی دقیق جهت جلوگیری از پذیرش رشته‌های خالی یا undefined/null متنی
    if (!token || token === "undefined" || token === "null" || token.trim() === "") {
      return null;
    }

    return token;
  },

  setAccessToken(accessToken: string): void {
    if (accessToken && accessToken !== "undefined" && accessToken !== "null") {
      localStorage.setItem(TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};