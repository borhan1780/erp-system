import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { usePeriods } from "../../hooks/usePeriods";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentPeriod,
} from "../../session";

export function PeriodSelector() {
  const { currentCompanyId } = useCurrentCompany();

  const { currentLedgerId } = useCurrentLedger();

  const { currentPeriodId, setCurrentPeriodId } = useCurrentPeriod();

  const { data, isLoading } = usePeriods(currentCompanyId);

  const periods =
    data?.filter((item) => item.ledger.id === currentLedgerId) ?? [];

  function handleChange(value: string) {
    setCurrentPeriodId(value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel>دوره مالی</InputLabel>

      <Select
        value={currentPeriodId ?? ""}
        label="دوره مالی"
        disabled={!currentLedgerId || isLoading}
        onChange={(event) => handleChange(event.target.value)}
        sx={{
          direction: "rtl",

          "& .MuiSelect-select": {
            textAlign: "right",
          },
        }}
       
      >
        {periods.map((item) => (
          <MenuItem
            key={item.period.id}
            value={item.period.id}
            sx={{
              justifyContent: "flex-start",
              textAlign: "right",
            }}
          >
            {item.period.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
