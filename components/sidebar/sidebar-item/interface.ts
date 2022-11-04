interface SidebarItem {
  icon?: string;
  title?: string;
  hasTrailing?: boolean;
  important?: boolean;
  logout?: boolean;
  collapsed?: boolean;
  state?: boolean;
  onClick?: () => void;
  href?: string;
}

export default SidebarItem;
