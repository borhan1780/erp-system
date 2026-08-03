import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CompanySelector } from "../components/ComponySelector";
import { LedgerSelector } from "../components/LedgerSelector";
import { PeriodSelector } from "../components/PeriodSelector";
import { ModuleLauncher } from "../components/ModuleLauncher";

import { useMe } from "../hooks";
import {
  useCurrentCompany,
  useCurrentLedger,
  useCurrentModule,
  useCurrentPeriod,
} from "../session";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data: me } = useMe();

  const { currentCompanyId } = useCurrentCompany();
  const { currentLedgerId } = useCurrentLedger();
  const { currentPeriodId } = useCurrentPeriod();
  const { currentModuleId } = useCurrentModule();

  const isModular = me?.app_mode === "MODULAR";

  const canEnter =
    Boolean(currentCompanyId) &&
    Boolean(currentLedgerId) &&
    Boolean(currentPeriodId) &&
    (!isModular || Boolean(currentModuleId));

  function handleEnter() {
    if (!canEnter) return;

    if (me?.app_mode === "TREE_VIEW") {
      navigate("/app/tree");
      return;
    }

    navigate("/app/module");
  }

  return (
    <Box
      dir="rtl"
      sx={{
        maxWidth: 1400,
        mx: "auto",
        py: 4,
        width: "100%",
      }}
    >
      {/* Environment */}

      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        {/* اضافه شدن align="right" برای راست‌چین کامل */}
        <Typography
          variant="h5"
          align="right"
          sx={{ fontWeight: 700 }}
          gutterBottom
        >
          انتخاب محیط کاری
        </Typography>

        <Typography variant="body2" align="right" color="text.secondary">
          شرکت، دفتر کل و سال مالی موردنظر را انتخاب کنید.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack
          spacing={2}
          direction={{
            xs: "column",
            md: "row",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <CompanySelector />
          </Box>

          <Box sx={{ flex: 1 }}>
            <LedgerSelector />
          </Box>

          <Box sx={{ flex: 1 }}>
            <PeriodSelector />
          </Box>
        </Stack>
      </Paper>

      {isModular ? (
        <Paper
          elevation={2}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 4,
            minHeight: 260,
          }}
        >
          {/* اضافه شدن align="right" برای راست‌چین کامل */}
          <Typography
            variant="h5"
            align="right"
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            سرویس‌ها
          </Typography>

          <Typography variant="body2" align="right" color="text.secondary">
            یکی از ماژول‌های زیر را برای ورود انتخاب کنید.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <ModuleLauncher />
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <Button
            variant="contained"
            size="large"
            disabled={!canEnter}
            onClick={handleEnter}
            sx={{
              minWidth: 220,
              py: 1.5,
              borderRadius: 3,
            }}
          >
            ورود به برنامه
          </Button>
        </Box>
      )}
    </Box>
  );
}
