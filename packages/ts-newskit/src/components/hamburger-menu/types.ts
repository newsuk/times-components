type MenuItemL2 = {
  title: string;
  url: string;
  slug: string;
};

export type MenuItemL1 = {
  title: string;
  url: string;
  slug: string;
  items?: MenuItemL2[];
};

export type NavigationData = {
  mainMenuItems: MenuItemL1[];
  moreMenuItems: MenuItemL1[];
  accountMenuItems: MenuItemL1[];
};
