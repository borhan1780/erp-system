import { useQuery } from "@tanstack/react-query"
import { getMe } from "../api/me.api"
import { authStorage } from "@/core/security";

export function useMe() {
  const token = authStorage.getAccessToken();

  return useQuery({
    queryKey:["me" , token],
    queryFn:getMe,
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    retry: 1,

  })
}