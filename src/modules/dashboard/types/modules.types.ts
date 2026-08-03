import type { Company } from "@/shared/types/company.types";

export interface ModuleItem {
  id: number;
  name_fa: string;
  name_en: string;
  prefix: string;
  color: string;
}

export interface CompanyModules {
  company: Company;
  modules: ModuleItem[];
}

export type ModulesResponse = CompanyModules[];
