export type NavigationItemItem = {
  title: string;
  url: string;
  slug: string;
};

export type NavigationItem = {
  title: string;
  url: string;
  slug: string;
  items?: NavigationItemItem[];
};

export type NavigationData = {
  menuItems: NavigationItem[];
  moreMenuItems?: NavigationItem[];
};
