import { AppBar, Toolbar, Box, Chip, Stack } from "@mui/material";
import { useMe } from "@/modules/dashboard/hooks/useMe";
import { useModules } from "@/modules/dashboard/hooks/useModules";
import { usePeriods } from "@/modules/dashboard/hooks/usePeriods";
import { useCurrentCompany } from "@/modules/dashboard/session/useCurrentCompany";
import { useCurrentPeriod } from "@/modules/dashboard/session/useCurrentPeriod";
import UserMenu from "@/modules/dashboard/components/Header/UserMenu";
import { ModuleSwitcher } from "../ModuleSwitcher/ModuleSwitcher";

const DRAWER_WIDTH = 280;

export function AppHeader() {
  const { data: me } = useMe();
  const { data: modulesData } = useModules();

  const { currentCompanyId } = useCurrentCompany();
  const { currentPeriodId } = useCurrentPeriod();

  const { data: periodsData } = usePeriods(currentCompanyId);

  const companyName = modulesData?.find(
    (x) => x.company.id === currentCompanyId,
  )?.company.name;
  const currentPeriodObj = periodsData?.find(
    (x) => x.period.id === currentPeriodId,
  );
  const ledgerName = currentPeriodObj?.ledger.name;
  const periodName = currentPeriodObj?.period.name;

  const isModular = me?.app_mode === "MODULAR";

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        mr: `${DRAWER_WIDTH}px`,
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", dir: "rtl" }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {isModular && <ModuleSwitcher />}

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {companyName && (
              <Chip
                label={`شرکت: ${companyName}`}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
            {ledgerName && (
              <Chip
                label={`دفتر: ${ledgerName}`}
                size="small"
                variant="outlined"
              />
            )}
            {periodName && (
              <Chip
                label={`دوره: ${periodName}`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Stack>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
