import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuSub,
  MenuDivider,
  useBreakpointKey
} from 'newskit';
import { AccountMenu } from '../styles';

const menuItemPresets = {
  minHeight: '60px',
  minWidth: '0',
  stylePreset: 'menuItem',
  typographyPreset: 'topNav010'
};

export const createMenu = (menuData: any) => {
  const breakpointKey = useBreakpointKey();
  const [moreSelected, setMoreSelected] = useState<boolean>(false);

  const menuItems = breakpointKey === 'lg' ? 4 : menuData.length;

  const moreMenuLength = menuData.length - menuItems;
  const navItems = menuData
    .slice(0, menuItems)
    .map(({ title, url }: { title: string; url: string }) => (
      <MenuItem
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
          ...menuItemPresets,
          list: { stylePreset: 'moreSubMenu' }
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
        overrides={{
          ...menuItemPresets
        }}
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
      <MenuItem href="/login" overrides={{ ...menuItemPresets }}>
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
