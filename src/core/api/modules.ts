export const apiModules = {
  general: "/general",
  accounting: "/accounting",
  warehouse: "/warehouse",
  hcm: "/hcm",
  treasury: "/treasury",
} as const;

export type ApiModule = keyof typeof apiModules;
