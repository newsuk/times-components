// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
  clickHandler: (title: string) => void,
  topNavAvailableSpace: number
) => {
  const [moreSelected, setMoreSelected] = useState<boolean>(false);

  const handleMoreClick = () => {
    setMoreSelected(!moreSelected);
    clickHandler('More');
  };

  const { responsiveMenuData, showMoreMD } = getResponsiveNavData<
    ResponsiveMenuItemParent
  >(menuData, { md: topNavAvailableSpace }, 12, 8);

  const navItems = responsiveMenuData.map(({ title, url, md }) => (
    <StyledVisibleMenuItems
      href={url}
      overrides={{
        ...menuItemPresets,
        paddingInline: { xs: 'space000', md: 'space030' },
        paddingBlockEnd: { xs: 'space000', md: 'space030' },
        paddingBlockStart: { xs: 'space010', md: 'space030' },
        stylePreset: {
          xs: 'menuItemScroll',
          md: 'menuItem'
        }
      }}
      onClick={() => clickHandler(title)}
      key={url}
      $hide={md}
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
        $showMore={showMoreMD}
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
  menuData.map(({ title, url, md }) => (
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
      $show={md}
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
