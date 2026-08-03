export interface MenuItemType {
  id: string | number;
  title: string;
  icon?: string;
  path?: string;
  children?: MenuItemType[];
}

export interface GetMenuParams {
  companyId: string;
  ledgerId?: string | null;
  periodId?: string | null;
  moduleId?: number | null;
}
