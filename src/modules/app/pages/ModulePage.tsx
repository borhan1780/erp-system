import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useModules } from "@/modules/dashboard/hooks/useModules";
import { useCurrentCompany } from "@/modules/dashboard/session/useCurrentCompany";
import { useCurrentModule } from "@/modules/dashboard/session/useCurrentModule";

export function ModulePage() {
  const { modulePrefix } = useParams();
  const { data: modulesData } = useModules();
  const { currentCompanyId } = useCurrentCompany();
  const { currentModuleId } = useCurrentModule();

  const currentCompanyObj = modulesData?.find(
    (item) => item.company.id === currentCompanyId
  );

  // پیدا کردن نام ماژول فعال
  const activeModule = currentCompanyObj?.modules.find(
    (m) => m.id === currentModuleId || m.prefix === modulePrefix
  );

  const moduleName = activeModule?.name_fa ?? "ماژول انتخابی";

  return (
    <Paper sx={{ p: 4, borderRadius: 3, dir: "rtl" }}>
      <Typography variant="h5" align="right" sx={{ fontWeight: 700 }}>
        به ماژول {moduleName} خوش آمدید
      </Typography>
      <Typography variant="body2" align="right" color="text.secondary" sx={{ mt: 1 }}>
        منوی سمت چپ اختصاصاً زیرمجموعه‌های ماژول {moduleName} را نمایش می‌دهد.
      </Typography>
    </Paper>
  );
}