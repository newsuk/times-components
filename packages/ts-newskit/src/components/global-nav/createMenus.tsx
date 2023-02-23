import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuSub,
  MenuDivider,
  useBreakpointKey
} from 'newskit';
import { AccountMenu } from './styles';

export const createMenu = (menuData: any) => {
  const breakpointKey = useBreakpointKey();
  const [moreSelected, setMoreSelected] = useState<boolean>(false);

  const menuItems = breakpointKey === 'lg' ? 4 : menuData.length;
  const menuStyle =
    breakpointKey === 'xs' || breakpointKey === 'sm'
      ? 'menuItemScroll'
      : 'menuItem';

  const moreMenuLength = menuData.length - menuItems;
  const navItems = menuData
    .slice(0, menuItems)
    .map(({ title, url }: { title: string; url: string }) => (
      <MenuItem
        href={url}
        overrides={{ stylePreset: menuStyle, typographyPreset: 'topNav010' }}
        key={url}
      >
        {title}
      </MenuItem>
    ));

  return menuItems === 4 ? (
    <>
      {navItems}
      <MenuSub
        title="More"
        onClick={() => setMoreSelected(!moreSelected)}
        selected={moreSelected}
        expanded={moreSelected}
        overrides={{
          stylePreset: 'menuItem',
          list: { stylePreset: 'moreSubMenu' },
          typographyPreset: 'topNav010'
        }}
        data-testid="more-sub-menu"
      >
        <Menu
          vertical
          overrides={{ spaceInline: 'sizing000' }}
          aria-label="More menu items"
        >
          {createMoreMenu(menuData, moreMenuLength)}
        </Menu>
      </MenuSub>
    </>
  ) : (
    navItems
  );
};

const createMoreMenu = (menuData: any, moreMenuLength: number) =>
  menuData
    .slice(-moreMenuLength)
    .map(({ title, url }: { title: string; url: string }) => (
      <MenuItem
        href={url}
        overrides={{
          minWidth: '200px',
          stylePreset: 'subMenuItem',
          typographyPreset: 'topNav010'
        }}
        key={url}
      >
        {title}
      </MenuItem>
    ));

export const createAccountMenu = (isLoggedIn: boolean, menuData: any) => {
  const [myAccountSelected, setMyAccountSelected] = useState<boolean>(false);

  return isLoggedIn ? (
    <Menu overrides={{ spaceInline: 'space000' }} aria-label="My Account Menu">
      <MenuDivider />
      <MenuItem
        href="/times-plus"
        overrides={{ stylePreset: 'menuItem', typographyPreset: 'topNav010' }}
      >
        Times +
      </MenuItem>
      <MenuDivider />
      <MenuSub
        title="My Account"
        onClick={() => setMyAccountSelected(!myAccountSelected)}
        selected={myAccountSelected}
        expanded={myAccountSelected}
        overrides={{
          stylePreset: 'menuItem',
          list: { stylePreset: 'moreSubMenu' },
          typographyPreset: 'topNav010'
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
              key={url}
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
        overrides={{ stylePreset: 'menuItem', typographyPreset: 'topNav010' }}
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
      >
        Subscribe
      </MenuItem>
    </AccountMenu>
  );
};
