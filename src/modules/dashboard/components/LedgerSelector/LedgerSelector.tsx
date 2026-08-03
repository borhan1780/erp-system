import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { usePeriods } from "../../hooks/usePeriods";
import { useCurrentCompany, useCurrentLedger } from "../../session";

export function LedgerSelector() {
  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId, setCurrentLedgerId } = useCurrentLedger();

  const { data, isLoading } = usePeriods(currentCompanyId);

  const ledgers = Array.from(
    new Map(data?.map((item) => [item.ledger.id, item.ledger]) ?? []).values(),
  );

  function handleChange(value: string) {
    setCurrentLedgerId(value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel>دفتر کل</InputLabel>

      <Select
        value={currentLedgerId ?? ""}
        label="دفتر کل"
        disabled={!currentCompanyId || isLoading}
        onChange={(event) => handleChange(event.target.value)}
        sx={{
          direction: "rtl",

          "& .MuiSelect-select": {
            textAlign: "right",
          },
        }}
      
      >
        {ledgers.map((ledger) => (
          <MenuItem
            key={ledger.id}
            value={ledger.id}
            sx={{
              justifyContent: "flex-start",
              textAlign: "right",
            }}
          >
            {ledger.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
