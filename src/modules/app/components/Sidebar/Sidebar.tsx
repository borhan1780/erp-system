import { useState } from "react";
import {
  Drawer,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  ChevronRightRounded,
  SearchRounded,
  RefreshRounded,
} from "@mui/icons-material";
import { useMenu } from "../../hooks/useMenu";
import { MenuTree } from "../MenuTree/MenuTree";
import { useModules } from "@/modules/dashboard/hooks/useModules";
import { useCurrentCompany } from "@/modules/dashboard/session/useCurrentCompany";
import { useCurrentModule } from "@/modules/dashboard/session/useCurrentModule";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { data: menu, isLoading, isError, refetch, isModular } = useMenu();
  const { data: modulesData } = useModules();
  const { currentCompanyId } = useCurrentCompany();
  const { currentModuleId } = useCurrentModule();

  const [searchTerm, setSearchTerm] = useState("");

  const currentCompanyObj = modulesData?.find(
    (item) => item.company.id === currentCompanyId
  );
  const activeModule = currentCompanyObj?.modules.find(
    (m) => m.id === currentModuleId
  );
  const moduleName = activeModule?.name_fa;

  const menuContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#0B2B48",
        color: "#ffffff",
        dir: "rtl",
      }}
    >
      {/* برند و لوگو */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", letterSpacing: 1 }}>
          NOAVARAN GROUP
        </Typography>
      </Box>

      {/* ورودی جستجو */}
      <Box sx={{ px: 2, pb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="جستجو..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              borderRadius: 2.5,
              fontSize: "0.85rem",
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
              "&.Mui-focused fieldset": { borderColor: "#2B78E4" },
            },
          }}
        />
      </Box>

      {/* بدنه اصلی منو */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 1.5 }}>
        {/* کادر آبی شاخص نام ماژول - فقط زمانی که ماژول فعال در حالت MODULAR داریم */}
        {isModular && moduleName && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#2B78E4",
              color: "#ffffff",
              py: 1.2,
              px: 2,
              borderRadius: 2.5,
              mb: 1.5,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
              {moduleName}
            </Typography>
          </Box>
        )}

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={26} sx={{ color: "#ffffff" }} />
          </Box>
        )}

        {isError && (
          <Typography color="error" variant="body2" align="center" sx={{ py: 2 }}>
            خطا در دریافت اطلاعات منو
          </Typography>
        )}

        {menu && <MenuTree items={menu} searchTerm={searchTerm} />}
      </Box>

      {/* فوتر سایدبار */}
      <Box sx={{ p: 1.5, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Button
          fullWidth
          size="small"
          onClick={() => refetch()}
          startIcon={<RefreshRounded fontSize="small" />}
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            justifyContent: "center",
            fontSize: "0.8rem",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)", color: "#ffffff" },
          }}
        >
          بروزرسانی منو
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "#0B2B48",
            top: 64,
            height: "calc(100% - 64px)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 1, color: "#fff" }}>
          <IconButton onClick={onMobileClose} sx={{ color: "#fff" }}>
            <ChevronRightRounded />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
            منوی سیستم
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        {menuContent}
      </Drawer>

      <Box
        component="aside"
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          top: "64px",
          right: 0,
          left: "auto !important",
          width: DRAWER_WIDTH,
          height: "calc(100vh - 64px)",
          bgcolor: "#0B2B48",
          zIndex: 1100,
        }}
      >
        {menuContent}
      </Box>
    </>
  );
}