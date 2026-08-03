import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { useModules } from "../../hooks/useModules";
import { useCurrentCompany, useCurrentLedger, useCurrentPeriod } from "../../session";

export function CompanySelector() {
  const { data, isLoading } = useModules();

  const { currentCompanyId, setCurrentCompanyId } = useCurrentCompany();

  const { setCurrentPeriodId } = useCurrentPeriod();

  const { setCurrentLedgerId } = useCurrentLedger();
  
  function handleChange(event: SelectChangeEvent) {
    setCurrentCompanyId(event.target.value);
    setCurrentPeriodId(null);
    setCurrentLedgerId(null);
  }

  return (
    <FormControl fullWidth>
  <InputLabel>
    شرکت
  </InputLabel>

  <Select
    labelId="company-selector-label"
    value={currentCompanyId ?? ""}
    label="شرکت"
    onChange={handleChange}
    disabled={isLoading}
    sx={{
      direction: "rtl",

      "& .MuiSelect-select": {
        textAlign: "right",
      },
    }}
  >
    {data?.map((item) => (
      <MenuItem
        key={item.company.id}
        value={item.company.id}
        sx={{
          direction: "rtl",
          textAlign: "right",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {item.company.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
  );
}
