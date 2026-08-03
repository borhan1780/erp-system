import { useQuery } from "@tanstack/react-query";

import { getPeriods } from "../api/periods.api";

export function usePeriods(companyId: string | null) {
  return useQuery({
    queryKey: ["periods", companyId],

    queryFn: () => getPeriods(companyId!),

    enabled: !!companyId,
  });
}
