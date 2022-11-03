interface SidebarItem {
  icon?: string;
  title?: string;
  hasTrailing?: boolean;
  important?: boolean;
  logout?: boolean;
  collapsed?: boolean;
  state?: boolean;
  onClick?: (params: any) => void;
}

export default SidebarItem;
