import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useModules } from "@/modules/dashboard/hooks/useModules";
import { useCurrentCompany } from "@/modules/dashboard/session/useCurrentCompany";
import { useCurrentModule } from "@/modules/dashboard/session/useCurrentModule";

export function ModuleSwitcher() {
  const { data: modulesData } = useModules();
  const { currentCompanyId } = useCurrentCompany();
  const { currentModuleId, setCurrentModuleId } = useCurrentModule();

  const currentCompanyObj = modulesData?.find(
    (item) => item.company.id === currentCompanyId,
  );
  const availableModules = currentCompanyObj?.modules ?? [];

  if (availableModules.length === 0) return null;

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="header-module-select-label">ماژول فعال</InputLabel>
      <Select
        labelId="header-module-select-label"
        value={currentModuleId ?? ""}
        label="ماژول فعال"
        onChange={(e) => setCurrentModuleId(Number(e.target.value))}
        sx={{
          direction: "rtl",
          "& .MuiSelect-select": {
            textAlign: "right",
          },
        }}
      >
        {availableModules.map((mod) => (
          <MenuItem
            key={mod.id}
            value={mod.id}
            sx={{
              direction: "rtl",
              textAlign: "right",
              justifyContent: "flex-start",
            }}
          >
            {mod.name_fa}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
