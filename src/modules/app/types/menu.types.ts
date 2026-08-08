export interface MenuItemType {
  id: string;
  order?: number;
  name_fa: string;
  name_en?: string;
  parent_id?: string | null;
  link?: string | null;
  short_key?: string | null;
  new_tab?: boolean;
  is_active?: boolean;
  entity_type_key?: string | null;
  items?: MenuItemType[]; // زیرمنوهای داخلی
  entity_type_command_key?: string | null;
}

export type MenuRawResponse = MenuItemType | MenuItemType[] | { items: MenuItemType[] };

export interface GetMenuParams {
  companyId: string;
  moduleId?: number | null;
}
