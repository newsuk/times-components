import React, { useState } from 'react';
import { Menu, Visible, Divider, Scroll, Stack, LinkInline } from 'newskit';
import { createAccountMenu, createMenu } from './createMenus';
import { mainMenuItems, accountMenuItems } from './menu-items.json';
import {
  NewsKitBurgerIcon,
  NewsKitMasthead,
  NewsKitSearchIcon
} from '../../assets';
import {
  MastheadMob,
  MenuScrollDivider,
  ScrollMenu,
  TopNavContainer,
  TopNavHide,
  TopNavIcon
} from './styles';
import NavSearch from './search';

type TopNavProps = {
  isLoggedIn?: boolean;
  mainMenu?: any;
  accountMenu?: any;
};

export const TopNav: React.FC<TopNavProps> = ({
  mainMenu = mainMenuItems,
  accountMenu = accountMenuItems,
  isLoggedIn = false
}) => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);

  return (
    <>
      <TopNavContainer
        flow="horizontal-center"
        stackDistribution="space-between"
        wrap="nowrap"
        ariaLabel="header"
      >
        <Stack
          flow="horizontal-center"
          stackDistribution="flex-start"
          wrap="nowrap"
        >
          <TopNavIcon
            overrides={{
              stylePreset: 'buttonTopNav'
            }}
            aria-label={hamburgerActive ? 'Close Menu' : 'Open Menu'}
            onClick={() => setHamburgerActive(!hamburgerActive)}
            aria-controls="hamburgerMenu"
            aria-selected={hamburgerActive}
          >
            <NewsKitBurgerIcon />
          </TopNavIcon>
          <TopNavHide xs sm display="flex">
            <Divider vertical />
            <TopNavIcon
              overrides={{
                stylePreset: searchActive
                  ? 'buttonTopNavActive'
                  : 'buttonTopNav'
              }}
              aria-label={searchActive ? 'Close Search' : 'Open Search'}
              onClick={() => setSearchActive(!searchActive)}
              aria-controls="searchTimes"
              aria-selected={searchActive}
            >
              <NewsKitSearchIcon />
            </TopNavIcon>
            <Divider vertical />
            {searchActive ? (
              <NavSearch />
            ) : (
              <LinkInline href="/">
                <NewsKitMasthead />
              </LinkInline>
            )}
            <Divider vertical />
            <Visible lg xl>
              <Menu
                overrides={{ spaceInline: 'space000' }}
                aria-label="menu-multiple-auto"
              >
                {createMenu(mainMenu)}
              </Menu>
            </Visible>
          </TopNavHide>
          <MastheadMob md lg xl display="flex">
            <LinkInline href="/">
              <NewsKitMasthead />
            </LinkInline>
          </MastheadMob>
        </Stack>
        <Visible md lg xl>
          {createAccountMenu(isLoggedIn, accountMenu)}
        </Visible>
      </TopNavContainer>
      <Visible xs sm>
        <Scroll overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}>
          <Stack flow="horizontal-top">
            <ScrollMenu
              overrides={{
                paddingInlineStart: 'space030',
                paddingInlineEnd: 'space030',
                spaceInline: 'space050'
              }}
              aria-label="menu-multiple-auto"
            >
              {createMenu(mainMenu)}
            </ScrollMenu>
          </Stack>
        </Scroll>
        <MenuScrollDivider />
      </Visible>
    </>
  );
};
