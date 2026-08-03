import type { NavItem } from "../../types/nav.types";

export interface SidebarProps {
  items: NavItem[];
}

export interface SidebarNavItemProps {
  item: NavItem;
  collapsed: boolean;
  activePath: string;
}
