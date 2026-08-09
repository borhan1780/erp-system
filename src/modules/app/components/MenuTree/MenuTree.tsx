import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  StorageRounded,
  FormatListBulletedRounded,
  AssessmentRounded,
  DescriptionRounded,
  BuildRounded,
  AutoFixHighRounded,
  FolderRounded,
  CircleRounded,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuItemType } from "../../types/menu.types";

interface MenuTreeProps {
  items?: MenuItemType[];
  level?: number;
  searchTerm?: string;
}

// تایپ کمکی برای ساختارهای احتمالی مختلف پاسخ API بدون استفاده از any
type RecordItem = MenuItemType & {
  title?: string;
  name?: string;
  children?: MenuItemType[];
  module?: { name_fa?: string };
  company_module?: { name_fa?: string };
};

// استخراج هوشمندانه عنوان آیتم
function getItemTitle(item: RecordItem): string {
  if (item.name_fa) return item.name_fa;
  if (item.title) return item.title;
  if (item.name) return item.name;
  if (item.module?.name_fa) return item.module.name_fa;
  if (item.company_module?.name_fa) return item.company_module.name_fa;
  return "بدون عنوان";
}

// استخراج فرزندان آیتم
function getItemChildren(item: RecordItem): MenuItemType[] {
  if (Array.isArray(item.items)) return item.items;
  if (Array.isArray(item.children)) return item.children;
  return [];
}

function getMenuIcon(title: string, level: number) {
  if (title.includes("اطلاعات پایه")) return <StorageRounded fontSize="small" />;
  if (title.includes("امور جاری")) return <FormatListBulletedRounded fontSize="small" />;
  if (title.includes("گزارشات ویژه")) return <DescriptionRounded fontSize="small" />;
  if (title.includes("گزارشات")) return <AssessmentRounded fontSize="small" />;
  if (title.includes("امکانات ویژه")) return <AutoFixHighRounded fontSize="small" />;
  if (title.includes("امکانات")) return <BuildRounded fontSize="small" />;
  if (level > 0) return <CircleRounded sx={{ fontSize: 6 }} />;
  return <FolderRounded fontSize="small" />;
}

export function MenuTree({ items = [], level = 0, searchTerm = "" }: MenuTreeProps) {
  const menuList = Array.isArray(items) ? items : [];

  const filteredItems = menuList.filter((item) => {
    const rawItem = item as RecordItem;
    if (rawItem.is_active === false) return false;
    if (!searchTerm) return true;

    const title = getItemTitle(rawItem);
    const children = getItemChildren(rawItem);

    const matchTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchChildren = children.some((child) =>
      getItemTitle(child as RecordItem).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchTitle || matchChildren;
  });

  return (
    <List component="div" disablePadding sx={{ width: "100%" }}>
      {filteredItems.map((item, index) => (
        <MenuItemNode
          key={item.id || index}
          item={item}
          level={level}
          searchTerm={searchTerm}
        />
      ))}
    </List>
  );
}

interface MenuItemNodeProps {
  item: MenuItemType;
  level: number;
  searchTerm: string;
}

function MenuItemNode({ item, level, searchTerm }: MenuItemNodeProps) {
  const [open, setOpen] = useState(Boolean(searchTerm));
  const navigate = useNavigate();
  const location = useLocation();

  const rawItem = item as RecordItem;
  const itemTitle = getItemTitle(rawItem);
  const childrenList = getItemChildren(rawItem);

  const hasChildren = childrenList.length > 0;
  const isSelected = Boolean(item.link && location.pathname.includes(item.link));

  function handleClick() {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else if (item.link) {
      if (item.new_tab) {
        window.open(item.link, "_blank");
      } else {
        navigate(item.link);
      }
    }
  }

  const isOpen = searchTerm ? true : open;

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={isSelected}
        sx={{
          pr: level * 1.5 + 1.2,
          pl: 1.2,
          py: 0.85,
          borderRadius: 2,
          mb: 0.5,
          direction: "rtl",
          color: "rgba(255, 255, 255, 0.85)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.08)",
            color: "#ffffff",
          },
          "&.Mui-selected": {
            bgcolor: "rgba(43, 120, 228, 0.35)",
            color: "#ffffff",
            fontWeight: 700,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 28, color: "rgba(255, 255, 255, 0.7)" }}>
          {getMenuIcon(itemTitle, level)}
        </ListItemIcon>

        <ListItemText
          primary={itemTitle}
          sx={{
            m: 0,
            "& .MuiListItemText-primary": {
              fontSize: level === 0 ? "0.875rem" : "0.8rem",
              fontWeight: level === 0 ? 600 : 400,
              textAlign: "right",
            },
          }}
        />

        {hasChildren && (
          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
            {isOpen ? (
              <ExpandLess fontSize="small" sx={{ color: "inherit" }} />
            ) : (
              <ExpandMore fontSize="small" sx={{ color: "inherit" }} />
            )}
          </Box>
        )}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <MenuTree
            items={childrenList}
            level={level + 1}
            searchTerm={searchTerm}
          />
        </Collapse>
      )}
    </>
  );
}