import { useQuery } from "@tanstack/react-query";

import { getMe } from "../api/me.api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
}
