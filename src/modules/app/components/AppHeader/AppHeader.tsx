import { AppBar, Toolbar, Box, Chip, Stack, IconButton } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { useMe } from "@/modules/dashboard/hooks/useMe";
import { useModules } from "@/modules/dashboard/hooks/useModules";
import { usePeriods } from "@/modules/dashboard/hooks/usePeriods";
import { useCurrentCompany } from "@/modules/dashboard/session/useCurrentCompany";
import { useCurrentPeriod } from "@/modules/dashboard/session/useCurrentPeriod";
import UserMenu from "@/modules/dashboard/components/Header/UserMenu";
import { ModuleSwitcher } from "../ModuleSwitcher/ModuleSwitcher";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { data: me } = useMe();
  const { data: modulesData } = useModules();

  const { currentCompanyId } = useCurrentCompany();
  const { currentPeriodId } = useCurrentPeriod();

  const { data: periodsData } = usePeriods(currentCompanyId);

  const companyName = modulesData?.find(
    (x) => x.company.id === currentCompanyId
  )?.company.name;
  const currentPeriodObj = periodsData?.find(
    (x) => x.period.id === currentPeriodId
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
        width: "100%", // عرض سرتاسری مطابق دیاگرام
        top: 0,
        right: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1, // بالاتر قرار گرفتن از سایدبار
        bgcolor: "#ffffff",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", direction: "rtl", minHeight: 64 }}>
        {/* سمت راست: دکمه موبایل، ماژول فعال و چیپ‌های اطلاعات */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuRounded />
          </IconButton>

          {isModular && <ModuleSwitcher />}

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
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