import { useQuery } from "@tanstack/react-query";

import { getModules } from "../api/modules.api";

export function useModules() {
  return useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
  });
}
