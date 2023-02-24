type MenuItem = {
  title: string;
  url: string;
  slug: string;
};

export type MenuItemParent = MenuItem & {
  items?: MenuItem[];
};

export type NavigationData = {
  mainMenuItems: MenuItemParent[];
  moreMenuItems: MenuItemParent[];
  accountMenuItems: MenuItemParent[];
};
