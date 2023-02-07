// @ts-nocheck
import React, { useState } from 'react';
import { Menu, MenuSub, MenuItem, MenuDivider, Block, TextField, customToNewsKitIcon, Button, IconButton } from 'newskit';
import { ThemeProvider } from 'newskit/esm/theme';
import styled from 'styled-components';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import { NewsKitBurger, NewsKitMasthead, NewsKitCloseIcon, NewsKitSearchIcon } from './icons';
import { StyledMenu, MenuNav, NavButton } from './styles';

import { TimesWebLightTheme } from '../../theme';
import Masthead from '../hamburger-menu/assets/Masthead';
import { IconFilledKeyboardArrowRight } from 'newskit/cjs/icons';

export const FullHamburgerMenu: React.FC<{}> = ({ loggedIn }) => {
  const [navbarVisibility, setNavbarVisibility] = useState(false)
  const handleOpen = () => {
    setNavbarVisibility(true)
  }

  const handleClose = () => (
    setNavbarVisibility(false)
  );

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
    <NavButton onClick={handleOpen} className={`navButton ${navbarVisibility ? " hideButton" : " "}`}>
        <NewsKitBurger/>
      </NavButton>
        <MenuNav className={`menuNav ${navbarVisibility ? " showMenu" : ""}`} aria-label="menu-vertical" vertical align="spaceBetween" overrides={{spaceInline: 'space000', width: '100%'}}>
    <HamburgerMenu loggedIn={loggedIn} handleClose={handleClose} navbarVisiblity={navbarVisibility}/>
    </MenuNav>
    </ThemeProvider>
  )
}

export const HamburgerMenu: React.FC<{}> = ({ loggedIn, handleClose, navbarVisibility }) => {
  const [navigationData, setNavigationData] = useState(mainNavItems)
  const [expandedL1, setExpandedL1] = useState('');

  const L1Overrides = {
        stylePreset: 'menuItemL1',
      };
  const L2Overrides = {
    stylePreset: 'menuItemL2'
  };

  const NavButtons: React.FC<{}> = () => (
    loggedIn ? (
      <>
      <div style={{display: 'flex'}}>
        <Button size="small" overrides={{stylePreset: "buttonSolidSecondary"}}>Login</Button>
        <div style={{margin: '4px'}}></div>
        <Button size="small" overrides={{stylePreset: "buttonSolidPrimary"}}>Subscribe</Button>
        </div>
        <Block marginBlock={'space030'}>
        <TextField
        size="small"
        id="icon-placement"
        aria-describedby="icon-placement-at"
        placeholder="Search times.co.uk"
        startEnhancer={
          <NewsKitSearchIcon overrides={{size: 'iconSize010'}} />
        }
        overrides={{ stylePreset: 'searchBar' }}
      />
      </Block>
        </>
    ) : (
      <>
      <TextField
        id="icon-placement"
        aria-describedby="icon-placement-at"
        placeholder="Search"
        startEnhancer={
          <NewsKitSearchIcon overrides={{size: 'iconSize010', stylePreset: 'searchBarEnhancer'}} />
        }
        overrides={{ stylePreset: 'searchBar' }}
      />
      <StyledMenu>
        <MenuItem selected={navigationData === mainNavItems} overrides={{ stylePreset: 'menuState'}} onClick={() => setNavigationData(mainNavItems)}>Sections</MenuItem>
        <MenuItem selected={navigationData === accountItems} overrides={{ stylePreset: 'menuState'}} onClick={() => setNavigationData(accountItems)}>Account</MenuItem>
        </StyledMenu>
      </>
    )
  )

  const NavItems = ({data}) => (
    data.map(item => (
      item.items ? (
        <>
        <MenuSub
            title={item.title}
            id={`vertical-${item.slug}`}
            expanded={expandedL1 === item.slug}
            onClick={() => expandedL1 !== item.slug ? setExpandedL1(item.slug): setExpandedL1('')}
            overrides={{...L1Overrides}}
          >
            {item.items.map(i => (
              <>
              <MenuItem href={i.url} id={`vertical-${i.slug}`} overrides={{...L2Overrides, paddingInline: "space020"}}>
              {i.title}
            </MenuItem>
            <MenuDivider />
            </>
            ))}
          </MenuSub>
          <MenuDivider />
          </>
      ) : (
        <>
        <MenuItem href={item.url} id={`vertical-${item.slug}`} overrides={{...L1Overrides}}>
              {item.title}
            </MenuItem>
            <MenuDivider />
            </>
      )
    ))
  )
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <MenuNav className={`menuNav ${navbarVisibility ? " showMenu" : ""}`} aria-label="menu-vertical" vertical align="spaceBetween" overrides={{spaceInline: 'space000', width: '100%'}}>
        <div id="containing div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#01000D', height: '50px'}} >
          <IconButton overrides={{stylePreset: "buttonMinimalSecondary", width: '50px', height: '50px'}} onClick={handleClose}>
          <NewsKitCloseIcon />
          </IconButton>
        <NewsKitMasthead />
        </div>
        <Block paddingInline="space040">
        <NavButtons />
        <NavItems data={navigationData.menuItems}/>
            {
              navigationData.moreMenuItems ? (
                <>
                <Block stylePreset="blockWrapper"
                  paddingInline="space040"
                  paddingBlock="space040">
                  More
                </Block>
                <MenuDivider />
                <NavItems data={navigationData.moreMenuItems}/>
                </>
                ) : null}
            </Block>
        </MenuNav>
      </ThemeProvider>
  )
}