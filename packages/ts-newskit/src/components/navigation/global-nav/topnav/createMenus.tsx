import React, { useState } from 'react';
import { Menu, MenuItem, MenuSub, MenuDivider } from 'newskit';
import {
  AccountMenu,
  StyledMenuItemsDropdown,
  StyledVisibleMenuItems,
  StyledMoreMenuSub
} from '../styles';
import { MenuItemParent, ResponsiveMenuItemParent } from '../types';
import { getResponsiveNavData } from '../../../../utils';

const XXL_BREAKPOINT = 1700;
const XL_BREAKPOINT = 1440;
const LG_BREAKPOINT = 1024;
const MD_BREAKPOINT = 768;
const OTHER_NAV_ELEMENTS = 540;

const menuItemPresets = {
  minHeight: '60px',
  minWidth: '0',
  stylePreset: 'menuItem',
  typographyPreset: 'topNav010'
};

const hasClickedOnMenu = (
  event: React.FocusEvent<HTMLAnchorElement>,
  testId: string
) =>
  event.relatedTarget instanceof HTMLAnchorElement &&
  event.relatedTarget.getAttribute('data-testid') === testId;

export const createMenu = (
  menuData: ResponsiveMenuItemParent[],
  clickHandler: (title: string) => void
) => {
  const [moreSelected, setMoreSelected] = useState<boolean>(false);

  const handleMoreClick = () => {
    setMoreSelected(!moreSelected);
    clickHandler('More');
  };

  const {
    responsiveMenuData,
    showMoreMD,
    showMoreLG,
    showMoreXL,
    showMoreXXL,
  } = getResponsiveNavData(menuData, {
    md: MD_BREAKPOINT - OTHER_NAV_ELEMENTS,
    lg: LG_BREAKPOINT - OTHER_NAV_ELEMENTS,
    xl: XL_BREAKPOINT - OTHER_NAV_ELEMENTS,
    xxl: XXL_BREAKPOINT - OTHER_NAV_ELEMENTS
  });

  const navItems = responsiveMenuData.map(({ title, url, md, lg, xl, xxl }) => (
    <StyledVisibleMenuItems
      href={url}
      overrides={{
        ...menuItemPresets,
        paddingInline: { xs: 'space000', md: 'space040' },
        paddingBlockEnd: { xs: 'space000', md: 'space040' },
        paddingBlockStart: { xs: 'space010', md: 'space040' },
        stylePreset: {
          xs: 'menuItemScroll',
          md: 'menuItem'
        }
      }}
      onClick={() => clickHandler(title)}
      key={url}
      $hideMD={md}
      $hideLG={lg}
      $hideXL={xl}
      $hideXXL={xxl}
    >
      {title}
    </StyledVisibleMenuItems>
  ));

  return (
    <>
      {navItems}

      <StyledMoreMenuSub
        title="More"
        onClick={handleMoreClick}
        selected={moreSelected}
        expanded={moreSelected}
        onBlur={e => {
          // Close menu when it loses focus if user has not clicked on it
          !hasClickedOnMenu(e, 'more-menu-item') && setMoreSelected(false);
        }}
        overrides={{
          ...menuItemPresets,
          list: { stylePreset: 'moreSubMenu' }
        }}
        data-testid="more-sub-menu"
        $showMoreMD={showMoreMD}
        $showMoreLG={showMoreLG}
        $showMoreXL={showMoreXL}
        $showMoreXXL={showMoreXXL}
      >
        <Menu
          vertical
          overrides={{ spaceInline: 'sizing000' }}
          aria-label="More menu items"
        >
          {createMoreMenu(responsiveMenuData, clickHandler)}
        </Menu>
      </StyledMoreMenuSub>
    </>
  );
};

const createMoreMenu = (
  menuData: ResponsiveMenuItemParent[],
  clickHandler: (title: string) => void
) =>
  menuData.map(({ title, url, md, lg, xl, xxl }) => (
    <StyledMenuItemsDropdown
      href={url}
      data-testid="more-menu-item"
      overrides={{
        minWidth: '200px',
        stylePreset: 'subMenuItem',
        typographyPreset: 'topNav010'
      }}
      key={url}
      onClick={() => clickHandler(`more: ${title}`)}
      $showMD={md}
      $showLG={lg}
      $showXL={xl}
      $showXXL={xxl}
    >
      {title}
    </StyledMenuItemsDropdown>
  ));

export const createAccountMenu = (
  isLoggedIn: boolean,
  menuData: MenuItemParent[],
  clickHandler: (title: string) => void
) => {
  const [myAccountSelected, setMyAccountSelected] = useState<boolean>(false);

  return isLoggedIn ? (
    <Menu overrides={{ spaceInline: 'space000' }} aria-label="My Account Menu">
      <MenuDivider />
      <MenuItem
        href="/times-plus"
        overrides={{
          ...menuItemPresets
        }}
        onClick={() => clickHandler('Times +')}
      >
        Times +
      </MenuItem>
      <MenuDivider />
      <MenuSub
        title="My Account"
        onClick={() => {
          setMyAccountSelected(!myAccountSelected);
          clickHandler('My Account');
        }}
        onBlur={e => {
          // Close menu when it loses focus if user has not clicked on it
          !hasClickedOnMenu(e, 'my-account-menu-item') &&
            setMyAccountSelected(false);
        }}
        selected={myAccountSelected}
        expanded={myAccountSelected}
        overrides={{
          ...menuItemPresets,
          list: { stylePreset: 'moreSubMenu' }
        }}
        data-testid="more-sub-menu"
      >
        <Menu
          vertical
          align="spaceBetween"
          overrides={{ spaceInline: 'sizing050' }}
          aria-label="My Account menu items"
        >
          {menuData.map(({ title, url }: { title: string; url: string }) => (
            <MenuItem
              href={url}
              overrides={{
                minWidth: '222px',
                stylePreset: 'subMenuItem',
                typographyPreset: 'topNav010'
              }}
              data-testid="my-account-menu-item"
              key={url}
              onClick={() => clickHandler(title)}
            >
              {title}
            </MenuItem>
          ))}
        </Menu>
      </MenuSub>
    </Menu>
  ) : (
    <AccountMenu
      overrides={{ spaceInline: 'space000' }}
      aria-label="My Account Menu"
    >
      <MenuDivider />
      <MenuItem
        href="/login"
        overrides={{ ...menuItemPresets }}
        onClick={() => clickHandler('Login')}
      >
        Login
      </MenuItem>
      <MenuDivider />
      <MenuItem
        href="/"
        overrides={{
          stylePreset: 'menuSubscribe',
          typographyPreset: 'topNav010',
          spaceInline: 'space090'
        }}
        onClick={() => clickHandler('Subscribe')}
      >
        Subscribe
      </MenuItem>
    </AccountMenu>
  );
};
