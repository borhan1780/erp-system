import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authStorage } from "@/core/security";
import { useSnackbar } from "@/shared/hooks/useSnackbar";
import { login } from "@/modules/login/api";

export function useLogin() {
  const navigate = useNavigate();
  const { notify } = useSnackbar();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      authStorage.setAccessToken(response.access_token);
      notify.success("ورود با موفقیت انجام شد.");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      notify.error("نام کاربری یا رمز عبور اشتباه است.");
    },
  });
}
