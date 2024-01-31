// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

type MenuItem = {
  title: string;
  url: string;
  slug: string;
};

export type MenuItemParent = MenuItem & {
  items?: MenuItem[];
};

export type ResponsiveMenuItemParent = MenuItemParent & {
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
};

export type NavigationData = {
  mainMenuItems: MenuItemParent[];
  moreMenuItems: MenuItemParent[];
  accountMenuItems: MenuItemParent[];
};
