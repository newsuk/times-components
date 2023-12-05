import React, { useState } from 'react';
import { Menu, MenuItem, MenuSub, MenuDivider, Visible } from 'newskit';
import { AccountMenu } from '../styles';

const menuItemPresets = {
  minHeight: '60px',
  minWidth: '0',
  stylePreset: 'menuItem',
  typographyPreset: 'topNav010'
};

export const createMenu = (
  menuData: any,
  clickHandler: (title: string) => void
) => {
  const [moreSelected, setMoreSelected] = useState<boolean>(false);

  const handleMoreClick = () => {
    setMoreSelected(!moreSelected);
    clickHandler('More');
  };

  const moreMenuLength = menuData.length - 4;
  const navItems = menuData
    .slice(0, menuData.length)
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
        onClick={() => clickHandler(title)}
        key={url}
      >
        {title}
      </MenuItem>
    ));

  return (
    <>
      {navItems}
      <Visible lg>
        <MenuSub
          title="More"
          onClick={handleMoreClick}
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
            {createMoreMenu(menuData, moreMenuLength, clickHandler)}
          </Menu>
        </MenuSub>
      </Visible>
    </>
  );
};

const createMoreMenu = (
  menuData: any,
  moreMenuLength: number,
  clickHandler: (title: string) => void
) =>
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
        onClick={() => clickHandler(`more: ${title}`)}
      >
        {title}
      </MenuItem>
    ));

export const createAccountMenu = (
  isLoggedIn: boolean,
  menuData: any,
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
