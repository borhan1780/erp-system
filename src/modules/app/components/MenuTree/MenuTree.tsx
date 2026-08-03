import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  FolderRounded,
  DescriptionRounded,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuItemType } from "../../types/menu.types";

interface MenuTreeProps {
  items: MenuItemType[];
  level?: number;
}

export function MenuTree({ items, level = 0 }: MenuTreeProps) {
  return (
    <List component="div" disablePadding sx={{ width: "100%" }}>
      {items.map((item) => (
        <MenuItemNode key={item.id} item={item} level={level} />
      ))}
    </List>
  );
}

interface MenuItemNodeProps {
  item: MenuItemType;
  level: number;
}

function MenuItemNode({ item, level }: MenuItemNodeProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isSelected = Boolean(item.path && location.pathname === item.path);

  function handleClick() {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else if (item.path) {
      navigate(item.path);
    }
  }

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={isSelected}
        sx={{
          pr: level * 2 + 2, // Indentation برای RTL
          py: 1,
          borderRadius: 2,
          mb: 0.5,
          direction: "rtl",
          "&.Mui-selected": {
            backgroundColor: "primary.lighter",
            color: "primary.main",
            fontWeight: 700,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          {hasChildren ? (
            <FolderRounded fontSize="small" />
          ) : (
            <DescriptionRounded fontSize="small" />
          )}
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                textAlign: "right",
                fontWeight: isSelected ? 700 : 400,
              }}
            >
              {item.title}
            </Typography>
          }
        />

        {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuTree items={item.children!} level={level + 1} />
        </Collapse>
      )}
    </>
  );
}
