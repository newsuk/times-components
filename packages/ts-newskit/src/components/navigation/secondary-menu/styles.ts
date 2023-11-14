import {
  Menu,
  styled,
  getColorCssFromTheme,
  Divider,
  Block,
  MenuSub,
  MenuItem,
  getMediaQueryFromTheme,
  BreakpointKeys
} from 'newskit';
import {
  MainMenuProp,
  SecondaryNavContainerProp,
  NavItemMobileContainerProp,
  SecondaryMenuItem
} from './types';
import TheTimesLight from '@newskit-themes/the-times/TheTimes-light.json';

const MAX_NAV_ITEMS_CHAR_COUNT_MD = 55;
const MAX_NAV_ITEMS_CHAR_COUNT_LG = 80;
const MAX_NAV_ITEMS_CHAR_COUNT_XL = 100;

const getLastMenuItemIndexWhenMoreItems = (
  data: SecondaryMenuItem[],
  charCount: number
) => {
  let charCountSum = 0;
  for (let i = 0; i < data.length; i++) {
    charCountSum = charCountSum + data[i].title.length;
    if (charCountSum > charCount) {
      return i - 1;
    }
  }
  return undefined;
};

const getMaxCharCount = (breakpoint: BreakpointKeys) => {
  let charCount = 0;
  switch (breakpoint) {
    case 'xl':
      charCount = MAX_NAV_ITEMS_CHAR_COUNT_XL;
      break;
    case 'lg':
      charCount = MAX_NAV_ITEMS_CHAR_COUNT_LG;
      break;
    case 'md':
      charCount = MAX_NAV_ITEMS_CHAR_COUNT_MD;
      break;
    default:
      charCount = MAX_NAV_ITEMS_CHAR_COUNT_MD;
  }
  return charCount;
};

const hasMoreThanMaxChar = (
  data: SecondaryMenuItem[],
  breakpoint: BreakpointKeys
) => {
  const maxCharCount = getMaxCharCount(breakpoint);
  return !!getLastMenuItemIndexWhenMoreItems(data, maxCharCount);
};

const visibleItemsLength = (
  data: SecondaryMenuItem[],
  breakpoint: BreakpointKeys
) => {
  const maxCharCount = getMaxCharCount(breakpoint);
  const index = getLastMenuItemIndexWhenMoreItems(data, maxCharCount);
  if (!!index) {
    return index + 1;
  } else {
    return data.length;
  }
};

const moreItemsLength = (
  data: SecondaryMenuItem[],
  breakpoint: BreakpointKeys
) => {
  return data.length - visibleItemsLength(data, breakpoint);
};

export const MainMenu = styled(Menu)<MainMenuProp>`
  ${getMediaQueryFromTheme('md', 'lg')} {
    padding-left: ${({ data }) =>
      hasMoreThanMaxChar(data, 'md') ? '48px' : '54px'};
    padding-right: ${({ data }) =>
      hasMoreThanMaxChar(data, 'md') ? '28px' : '54px'};
    ul {
      justify-content: ${({ data }) =>
        hasMoreThanMaxChar(data, 'md') ? `space-between` : `center`};
    }
  }
  ${getMediaQueryFromTheme('lg', 'xl')} {
    padding-left: ${({ data }) =>
      hasMoreThanMaxChar(data, 'lg') ? '48px' : '54px'};
    padding-right: ${({ data }) =>
      hasMoreThanMaxChar(data, 'lg') ? '28px' : '54px'};
    ul {
      justify-content: ${({ data }) =>
        hasMoreThanMaxChar(data, 'lg') ? `space-between` : `center`};
    }
  }
  ${getMediaQueryFromTheme('xl')} {
    padding-left: ${({ data }) =>
      hasMoreThanMaxChar(data, 'xl') ? '48px' : '54px'};
    padding-right: ${({ data }) =>
      hasMoreThanMaxChar(data, 'xl') ? '28px' : '54px'};
    ul {
      justify-content: ${({ data }) =>
        hasMoreThanMaxChar(data, 'xl') ? `space-between` : `center`};
    }
  }
`;

export const VisibleCheckContainer = styled.div<MainMenuProp>`
  ${getMediaQueryFromTheme('md', 'lg')} {
    ${({ data }) => !hasMoreThanMaxChar(data, 'md') && 'display: none'};
  }
  ${getMediaQueryFromTheme('lg', 'xl')} {
    ${({ data }) => !hasMoreThanMaxChar(data, 'lg') && 'display: none'};
  }
  ${getMediaQueryFromTheme('xl')} {
    ${({ data }) => !hasMoreThanMaxChar(data, 'xl') && 'display: none'};
  }
`;

export const VisibleCheckNavContainer = styled.div<MainMenuProp>`
  display: flex;
  ${getMediaQueryFromTheme('md', 'lg')} {
    li:nth-last-child(-n+${({ data }) => moreItemsLength(data, 'md')}) {
      display: none;
  } 
  ${getMediaQueryFromTheme('lg', 'xl')} {
    li:nth-last-child(-n+${({ data }) => moreItemsLength(data, 'lg')}) {
      display: none;
  }
  ${getMediaQueryFromTheme('xl')} {
    li:nth-last-child(-n+${({ data }) => moreItemsLength(data, 'xl')}) {
      display: none;
  }
`;

export const VisibleCheckMenuContainer = styled.div<MainMenuProp>`
${getMediaQueryFromTheme('md', 'lg')} {
  li:nth-child(-n+${({ data }) => visibleItemsLength(data, 'md')}) {
    display: none;
} 
${getMediaQueryFromTheme('lg', 'xl')} {
  li:nth-child(-n+${({ data }) => visibleItemsLength(data, 'lg')}) {
    display: none;
}
${getMediaQueryFromTheme('xl')} {
  li:nth-child(-n+${({ data }) => visibleItemsLength(data, 'xl')}) {
    display: none;
}
`;

export const MenuDivider = styled(Divider)`
  width: 100%;
  margin: auto;
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MenuDividerDropdown = styled(Divider)`
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const SecondaryNavContainer = styled.div<SecondaryNavContainerProp>`
  position: sticky;
  ${({ topMobile }) => topMobile !== undefined && `top: ${topMobile}px`};
  ${getMediaQueryFromTheme('md')} {
    ${({ topDesktop }) => topDesktop !== undefined && `top: ${topDesktop}px`};
  }
  background-color: ${TheTimesLight.colors.interfaceBackground};
  z-index: 2;
`;

export const SecondaryNavMenuItemMob = styled(MenuItem)<{
  isSelected: boolean;
}>`
  ${({ isSelected }) =>
    isSelected &&
    `& span {
    font-weight: 800
  }`};
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const StyledMenuSub = styled(MenuSub)`
  min-width: 100px;
`;

export const StyledMenuItemsDesktop = styled(MenuItem)`
  min-width: max-content;
`;

export const StyledBlock = styled(Block)`
  display: flex;
  justify-content: space-between;
  height: 48px;
`;

export const MenuContainerMob = styled(StyledBlock)`
  align-items: center;
  ${getColorCssFromTheme('backgroundColor', 'neutral010')};
  ${getColorCssFromTheme('backgroundColor', 'sectionBrand060')};
  &:hover {
    cursor: pointer;
  }
`;

export const MenuContainer = styled(Menu)`
  ul {
    display: flex;
    justify-content: flex-end;
    background-color: #f5f5f5;
    float: right;
    width: max-content;
    min-width: 200px;
    z-index: 1;
  }

  & hr:last-child {
    display: none;
  }

  li:hover {
    background-color: #e4e4e4;
  }

  li button:hover {
    background-color: #e4e4e4;
  }
`;

export const NavItemsContainer = styled.div`
  height: 100%;
  top: 48px;
  left: 0;
  right: 0;
  z-index: 1;
  ${getColorCssFromTheme('backgroundColor', 'white')};
`;

export const NavItemsMobileContainer = styled.div<NavItemMobileContainerProp>`
  height: ${({ $height }) => $height};
  overflow-y: auto;
`;

export const MenuSubMob = styled(MenuSub)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
