import { useQuery } from "@tanstack/react-query";

import { getInfo } from "../api/info.api";

export function useInfo() {
  return useQuery({
    queryKey: ["info"],
    queryFn: getInfo,
  });
}
