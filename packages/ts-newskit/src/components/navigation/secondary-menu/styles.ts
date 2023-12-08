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
import { SecondaryNavContainerProp, NavItemMobileContainerProp } from './types';

export const MenuDivider = styled(Divider)`
  width: 100%;
  margin: auto;
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MenuDividerDropdown = styled(Divider)`
  ${getColorCssFromTheme('borderColor', 'neutral030')};
`;

export const MainMenu = styled(Menu)`
  padding-inline: 48px;
  ul {
    justify-content: center;
  }
  li {
    position: relative;
  }
`;

export const SecondaryNavContainer = styled.div<SecondaryNavContainerProp>`
  position: sticky;
  ${({ topMobile }) => topMobile !== undefined && `top: ${topMobile}px`};
  ${getMediaQueryFromTheme('md')} {
    ${({ topDesktop }) => topDesktop !== undefined && `top: ${topDesktop}px`};
  }
  background-color: white;
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

export const StyledMenuSub = styled(MenuSub)<{
  $showMoreMD: boolean;
  $showMoreLG: boolean;
  $showMoreXL: boolean;
}>`
  min-width: 100px;
  display: none;

  & > ul {
    right: 0;
  }

  ${getMediaQueryFromTheme('md', 'lg')} {
    ${({ $showMoreMD }) => $showMoreMD && `display: flex`};
  }
  ${getMediaQueryFromTheme('lg', 'xl')} {
    ${({ $showMoreLG }) => $showMoreLG && `display: flex`};
  }
  ${getMediaQueryFromTheme('xl')} {
    ${({ $showMoreXL }) => $showMoreXL && `display: flex`};
  }
`;

export const StyledMenuItemsDesktop = styled(MenuItem)<{
  $hideMD?: boolean;
  $hideLG?: boolean;
  $hideXL?: boolean;
}>`
  min-width: max-content;

  ${getMediaQueryFromTheme('md', 'lg')} {
    ${({ $hideMD }) => $hideMD && `display: none`};
  }
  ${getMediaQueryFromTheme('lg', 'xl')} {
    ${({ $hideLG }) => $hideLG && `display: none`};
  }
  ${getMediaQueryFromTheme('xl')} {
    ${({ $hideXL }) => $hideXL && `display: none`};
  }
`;
export const StyledMenuItemsDropdown = styled(MenuItem)<{
  $showMD?: boolean;
  $showLG?: boolean;
  $showXL?: boolean;
}>`
  min-width: max-content;
  display: none;

  ${getMediaQueryFromTheme('md', 'lg')} {
    ${({ $showMD }) => $showMD && `display: flex`};
  }
  ${getMediaQueryFromTheme('lg', 'xl')} {
    ${({ $showLG }) => $showLG && `display: flex`};
  }
  ${getMediaQueryFromTheme('xl')} {
    ${({ $showXL }) => $showXL && `display: flex`};
  }
`;

export const StyledBlock = styled(Block)`
  display: flex;
  justify-content: space-between;
  height: 48px;
`;

export const MenuContainerMob = styled(StyledBlock)<{ isDefault: boolean }>`
  align-items: center;
  ${({ isDefault }) =>
    getColorCssFromTheme(
      'backgroundColor',
      isDefault ? 'neutral010' : 'sectionBrand060'
    )};
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
