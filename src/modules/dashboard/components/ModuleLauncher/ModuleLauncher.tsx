import {
  AppsRounded,
  AccountBalanceRounded,
  Inventory2Rounded,
  PaymentsRounded,
  PointOfSaleRounded,
  PrecisionManufacturingRounded,
  GroupsRounded,
  FolderRounded,
} from "@mui/icons-material";

import { Box, CardActionArea, Divider, Paper, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useModules } from "../../hooks/useModules";
import { useCurrentCompany } from "../../session/useCurrentCompany";
import { useCurrentModule } from "../../session/useCurrentModule";

export function ModuleLauncher() {
  const navigate = useNavigate();

  const { data } = useModules();

  const { currentCompanyId } = useCurrentCompany();

  const { setCurrentModuleId } = useCurrentModule();

  const company = data?.find((item) => item.company.id === currentCompanyId);

  function handleSelectModule(moduleId: number) {
    setCurrentModuleId(moduleId);

    navigate("/app/module");
  }

  function getModuleIcon(prefix: string) {
    switch (prefix) {
      case "accounting":
        return <AccountBalanceRounded fontSize="large" />;

      case "warehouse":
        return <Inventory2Rounded fontSize="large" />;

      case "treasury":
        return <PaymentsRounded fontSize="large" />;

      case "sell":
        return <PointOfSaleRounded fontSize="large" />;

      case "production":
        return <PrecisionManufacturingRounded fontSize="large" />;

      case "hcm":
        return <GroupsRounded fontSize="large" />;

      case "shared":
        return <FolderRounded fontSize="large" />;

      default:
        return <AppsRounded fontSize="large" />;
    }
  }

  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        },

        gap: 3,
      }}
    >
      {company?.modules.map((module) => (
        <Paper
          key={module.id}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
            overflow: "hidden",
            transition: ".25s",

            "&:hover": {
              borderColor: "primary.main",
              boxShadow: 6,
              transform: "translateY(-6px)",
            },
          }}
        >
          <CardActionArea
            onClick={() => handleSelectModule(module.id)}
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                p: 3,

                display: "flex",

                flexDirection: "column",

                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 74,
                  height: 74,

                  borderRadius: "50%",

                  bgcolor: `#${module.color}20`,

                  color: `#${module.color}`,

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  mb: 2,
                }}
              >
                {getModuleIcon(module.prefix)}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {module.name_fa}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  textAlign: "center",
                }}
              >
                {module.name_en}
              </Typography>

              <Divider
                sx={{
                  my: 2,
                  width: "100%",
                }}
              />

              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: 600,
                }}
              >
                ورود به ماژول
              </Typography>
            </Box>
          </CardActionArea>
        </Paper>
      ))}
    </Box>
  );
}
