// @ts-nocheck
import React, { useState } from 'react';
import { Menu, MenuSub, MenuItem, MenuDivider, Block, TextField, customToNewsKitIcon, Button, IconButton } from 'newskit';
import { ThemeProvider } from 'newskit/esm/theme';
import styled from 'styled-components';
import mainNavItems from './menu-items.json';
import accountItems from './account-items.json';
import { NewsKitBurger, NewsKitMasthead, NewsKitCloseIcon, NewsKitSearchIcon } from './icons';
import { StyledMenu, MenuNav, StyledButton, NavButton } from './styles';

import { TimesWebLightTheme } from '../../theme';
import Masthead from './assets/Masthead';

export const NewMenu: React.FC<{}> = ({ loggedIn }) => {
  const [navigationData, setNavigationData] = useState(mainNavItems)
  const [navbarVisibility, setNavbarVisibility] = useState(false)
  const [expandedL1, setExpandedL1] = useState('');

  const handleOpen = () => {
    setNavbarVisibility(true)
  }

  const handleClose = () => {
    setNavbarVisibility(false)
  };

  const L1Overrides = {
        stylePreset: 'menuItemL1',
      };
  const L2Overrides = {
    stylePreset: 'menuItemL2'
  };

  const NavButtons: React.FC<{}> = () => (
    loggedIn ? (
      <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <StyledButton overrides={{stylePreset: "buttonSolidSecondary", width: '100%', marginBlock: 'space020', marginInline: 'space010'}}>Login</StyledButton>
        <StyledButton overrides={{stylePreset: "buttonSolidPrimary", width: '100%', marginBlock: 'space020', marginInline: 'space010'}}>Subscribe</StyledButton>
        </div>
        <TextField
        id="icon-placement"
        aria-describedby="icon-placement-at"
        placeholder="Search"
        startEnhancer={
          <NewsKitSearchIcon overrides={{size: 'iconSize010'}} />
        }
        overrides={{ stylePreset: 'searchBar' }}
      />
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

  const getNavItems = (navItems) => (
    navItems.map(item => (
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
      <NavButton onClick={handleOpen} className={`navButton ${navbarVisibility ? " hideButton" : " "}`}>
        <NewsKitBurger/>
      </NavButton>
        <MenuNav className={`menuNav ${navbarVisibility ? " showMenu" : ""}`} aria-label="menu-vertical" vertical align="spaceBetween" overrides={{spaceInline: 'space000', width: '100%'}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Block paddingInline="space000"
                  paddingBlock="space000">
          <IconButton overrides={{stylePreset: "buttonMinimalSecondary", width: '50px', height: '50px'}} onClick={handleClose}>
          <NewsKitCloseIcon />
          </IconButton>
        </Block>
        <NewsKitMasthead />
        </div>
        <NavButtons />
            {getNavItems(navigationData.menuItems)}
            {
              navigationData.moreMenuItems ? (
                <>
                <Block stylePreset="blockWrapper"
                  paddingInline="space040"
                  paddingBlock="space040">
                  More
                </Block>
                <MenuDivider />
                {getNavItems(navigationData.moreMenuItems)}
                </>
                ) : null}
            
        </MenuNav>
      </ThemeProvider>
  )
}