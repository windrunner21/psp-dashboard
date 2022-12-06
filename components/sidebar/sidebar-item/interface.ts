interface SidebarItem {
  icon?: string;
  title?: string;
  important?: boolean;
  logout?: boolean;
  collapsed?: boolean;
  state?: boolean;
  onClick?: () => void;
  href?: string;
}

export default SidebarItem;
