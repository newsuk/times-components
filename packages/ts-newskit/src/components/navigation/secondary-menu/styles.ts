import {
  Menu,
  styled,
  getColorCssFromTheme,
  Divider,
  Block,
  MenuSub,
  MenuItem,
  getMediaQueryFromTheme
} from 'newskit';
import {
  MainMenuProp,
  BreakPointProp,
  SecondaryNavContainerProp,
  NavItemMobileContainerProp
} from './types';
import TheTimesLight from '@newskit-themes/the-times/TheTimes-light.json';

export const MenuDivider = styled(Divider)<BreakPointProp>`
  width: ${({ breakpointKey }) =>
    breakpointKey === 'xl' ? '1140px' : 'calc(100% - 54px)'};
  margin: auto;
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MenuDividerDropdown = styled(Divider)`
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MainMenu = styled(Menu)<MainMenuProp>`
  padding-left: ${({ hasMoreItems }) => (hasMoreItems ? '48px' : '54px')};
  padding-right: ${({ hasMoreItems }) => (hasMoreItems ? '28px' : '54px')};
  ul {
    justify-content: ${({ hasMoreItems }) =>
      hasMoreItems ? `space-between` : `center`};
  }
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
