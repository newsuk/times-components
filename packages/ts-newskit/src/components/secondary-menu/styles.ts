import { Menu, styled, getColorCssFromTheme, Divider } from 'newskit';
import { MainMenuProp, MoreMenuItemsProp, BreakPointProp } from './types';

export const MenuDivider = styled(Divider)<BreakPointProp>`
  width: ${({ breakpointKey }) =>
    breakpointKey === 'xl' ? '1140px' : 'calc(100% - 54px)'};
  margin: auto;
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MenuDividerMobile = styled(Divider)`
  width: calc(100% - 64px);
  margin: auto;
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MenuDividerDropdown = styled(Divider)`
  margin: 0;
  margin: 0 16px;
  ${getColorCssFromTheme('borderColor', 'neutral030')};
  width: auto;
`;

export const MainMenu = styled(Menu)<MainMenuProp>`
  padding-left: 54px;
  padding-right: ${({ hasMoreItems }) => (hasMoreItems ? '28px' : '54px')};
  ul {
    justify-content: ${({ hasMoreItems }) =>
      hasMoreItems ? `space-between` : `center`};
  }
`;

export const Container = styled.div<MoreMenuItemsProp>`
  display: flex;
  justify-content: ${({ moreMenuItemsLength }) =>
    moreMenuItemsLength > 0 ? `space-between` : `center`};
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const MenuContainer = styled(Menu)`
  ul {
    display: flex;
    justify-content: flex-end;
    background-color: #f5f5f5;
    float: right;
    width: max-content;
    min-width: 200px;
  }
  li {
    margin: -2px 0;
  }

  li:first-child {
    margin: 0 0 -2px 0;
  }

  & hr:last-child {
    display: none;
  }

  li:hover {
    background-color: #e4e4e4;
    margin: -2px 0;
  }

  li:hover:first-child {
    background-color: #e4e4e4;
    margin: 0 0 -2px 0;
  }
`;

export const NavItemsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  ${getColorCssFromTheme('backgroundColor', 'white')};
`;
