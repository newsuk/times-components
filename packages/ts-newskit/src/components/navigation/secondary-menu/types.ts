export type SecondaryMenuItem = {
  title: string;
  url: string;
  slug: string;
};

export type ResponsiveSecondaryMenuItem = SecondaryMenuItem & {
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
};

export type SecondaryNavContainerProp = {
  topDesktop: number | undefined;
  topMobile: number | undefined;
};

export type BreakPointProp = {
  breakpointKey: string;
};

export type SecondaryMenuOptions = {
  isSelected: string;
  handleSelect: (value: string) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export type NavItemMobileContainerProp = {
  $height: string;
};
