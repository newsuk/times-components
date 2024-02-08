// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
