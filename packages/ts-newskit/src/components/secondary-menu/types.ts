export type SecondaryMenuItem = {
  title: string;
  url: string;
  slug: string;
};

export type MainMenuProp = {
  hasMoreItems: boolean;
};

export type BreakPointProp = {
  breakpointKey: string;
};

export type MoreMenuItemsProp = {
  moreMenuItemsLength: number;
};

export type SecondaryMenuOptions = {
  isSelected: string;
  handleSelect: (value: string) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

interface Size {
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

export const seeAllButtonWidth: Size = {
  xl: 0,
  lg: 120,
  md: 110,
  sm: 0,
  xs: 0
};
