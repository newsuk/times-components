import React, { useState } from 'react';
import { Menu, Visible, Divider, Scroll, Stack, LinkInline } from 'newskit';
import { createAccountMenu, createMenu } from './createMenus';
import {
  NewsKitBurgerIcon,
  NewsKitCloseIcon,
  NewsKitTimesMasthead,
  NewsKitSearchIcon,
  NewsKitSundayTimesMasthead
} from '../../../../assets';
import {
  MastheadMob,
  MenuScrollDivider,
  ScrollMenu,
  ScrollMenuContainer,
  TopNavContainer,
  TopNavHide,
  TopNavIcon
} from '../styles';
import NavSearch from '../search/search';
import { LoggedOutButtons } from './loggedOutButtons';

type TopNavProps = {
  isLoggedIn?: boolean;
  isSunday?: boolean;
  isHamburgerOpen: boolean;
  toggleHamburger: (isHamburgerOpen: boolean) => void;
  mainMenu?: any;
  accountMenu?: any;
};

export const TopNav: React.FC<TopNavProps> = ({
  mainMenu,
  accountMenu,
  isHamburgerOpen,
  toggleHamburger,
  isLoggedIn = false,
  isSunday = false
}) => {
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const logoProps = {
    height: 20,
    width: 200,
    overrides: { paddingInline: 'space040' },
    'aria-label': 'The Times &amp; The Sunday Times'
  };

  const NavMasthead = (
    <LinkInline href="/" overrides={{ stylePreset: 'menuLogo' }}>
      {isSunday ? (
        <NewsKitSundayTimesMasthead {...logoProps} />
      ) : (
        <NewsKitTimesMasthead {...logoProps} />
      )}
    </LinkInline>
  );

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
            aria-label={isHamburgerOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => toggleHamburger(!isHamburgerOpen)}
            aria-controls="hamburgerMenu"
            aria-expanded={isHamburgerOpen}
          >
            {isHamburgerOpen ? <NewsKitCloseIcon /> : <NewsKitBurgerIcon />}
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
              aria-expanded={searchActive}
            >
              <NewsKitSearchIcon />
            </TopNavIcon>
            <Divider vertical />
            {searchActive ? <NavSearch /> : NavMasthead}
            <Divider vertical />
            <Visible lg xl>
              <Menu
                overrides={{ spaceInline: 'space000' }}
                aria-label="Main menu"
              >
                {createMenu(mainMenu)}
              </Menu>
            </Visible>
          </TopNavHide>
          <MastheadMob md lg xl display="flex">
            {NavMasthead}
          </MastheadMob>
        </Stack>
        <Visible md lg xl>
          {createAccountMenu(isLoggedIn, accountMenu)}
        </Visible>
      </TopNavContainer>
      <ScrollMenuContainer xs sm>
        {!isLoggedIn && <LoggedOutButtons loginUrl={'/'} subscribeUrl={'/'} />}
        <Scroll overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}>
          <Stack flow="horizontal-top">
            <ScrollMenu
              overrides={{
                paddingInlineStart: 'space030',
                paddingInlineEnd: 'space030',
                spaceInline: 'space050'
              }}
              aria-label="Main menu"
            >
              {createMenu(mainMenu)}
            </ScrollMenu>
          </Stack>
        </Scroll>
        <MenuScrollDivider />
      </ScrollMenuContainer>
    </>
  );
};
