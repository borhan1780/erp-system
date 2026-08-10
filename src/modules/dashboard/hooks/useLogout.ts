import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/logout.api";
import { authStorage } from "@/core/security";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      authStorage.clear();

      localStorage.removeItem("session_company_id");
      localStorage.removeItem("session_ledger_id");
      localStorage.removeItem("session_period_id");
      localStorage.removeItem("session_module_id");

      queryClient.clear();

      navigate("/", { replace: true });
    },
  });
}