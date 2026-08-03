import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useModules } from "../../hooks/useModules";
import { useCurrentCompany } from "../../session/useCurrentCompany";
import { useCurrentPeriod } from "../../session/useCurrentPeriod";
import { useCurrentLedger } from "../../session/useCurrentLedger";
import { useCurrentModule } from "../../session/useCurrentModule";

export function ModuleSelector() {
  const { data } = useModules();

  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();

  const { currentModuleId, setCurrentModuleId } = useCurrentModule();

  const company = data?.find((x) => x.company.id === currentCompanyId);

  return (
    <FormControl fullWidth>
      <InputLabel>ماژول</InputLabel>

      <Select
        value={currentModuleId ?? ""}
        label="ماژول"
        disabled={!currentCompanyId || !currentLedgerId || !currentPeriodId}
        onChange={(e) => setCurrentModuleId(Number(e.target.value))}
      >
        {company?.modules.map((module) => (
          <MenuItem key={module.id} value={module.id}>
            {module.name_fa}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
