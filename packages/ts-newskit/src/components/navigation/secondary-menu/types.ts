export type SecondaryMenuItem = {
  title: string;
  url: string;
  slug: string;
};

export type MainMenuProp = {
  hasMoreItems: boolean;
};

export type StickyProps = {
  top: number;
  topInSmallScreen: number;
}

export type SecondaryNavContainerProp = StickyProps &  {
  isSmallScreen?: boolean;
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
