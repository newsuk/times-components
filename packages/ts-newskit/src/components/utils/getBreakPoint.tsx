import { useBreakpointKey } from 'newskit';
import { SecondaryMenuItem } from '../secondary-menu/types';

export const getBreakpoint = (data: SecondaryMenuItem[]) => {
  const breakpointKey = useBreakpointKey();

  const menuItems =
    breakpointKey === 'md' ? 7 : breakpointKey === 'lg' ? 9 : data.length;

  const moreMenuLength = data.length - menuItems;

  return { moreMenuLength, menuItems, breakpointKey };
};
