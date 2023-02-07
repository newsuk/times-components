// @ts-nocheck
import React, { useState } from 'react';
import { Menu, MenuSub, MenuItem, MenuDivider, Block, TextField, customToNewsKitIcon, Button } from 'newskit';
import { ThemeProvider } from 'newskit/esm/theme';
import { Search } from '@emotion-icons/bootstrap/Search';
import styled from 'styled-components';
import mainNavItems from './menu-items.json';
import accountItems from './account-items.json';

import { TimesWebLightTheme } from '../../theme';

const SearchIcon = customToNewsKitIcon(
    'SearchIcon',
    props => <Search {...props} />,
);

const StyledMenu = styled(Menu)`
  ul {
    justify-content: space-around;
  }
  li {
    width: 100%;
  }
`

const StyledButton = styled(Button)`
  border-radius: 2px !important;
`

const MenuNav = styled(Menu)`
  &.menuNav {
    overflow-y: scroll;
    background-color: #151515;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 0;
    max-width: 320px;
    z-index: 9;
    &.showMenu {
      width: 100%;
    }
  }
`;

const NavButton = styled.button`
  &.navButton {
    position: fixed;
    top: 0;
  }
  &.hideButton {
    display: none
  }
`;

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

  const getNavButtons = () => (
    loggedIn ? (
      <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1D1D1B'}}>
        <StyledButton overrides={{stylePreset: "buttonSolidSecondary", width: '100%', marginBlock: 'space020', marginInline: 'space010'}}>Login</StyledButton>
        <StyledButton overrides={{stylePreset: "buttonSolidPrimary", width: '100%', marginBlock: 'space020', marginInline: 'space010'}}>Subscribe</StyledButton>
        </div>
        <TextField
        id="icon-placement"
        aria-describedby="icon-placement-at"
        placeholder="Search"
        startEnhancer={
          <SearchIcon overrides={{size: 'iconSize010', stylePreset: 'searchBarEnhancer'}} />
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
          <SearchIcon overrides={{size: 'iconSize010', stylePreset: 'searchBarEnhancer'}} />
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
              <MenuItem href={i.url} id={`vertical-${i.slug}`} overrides={{...L2Overrides}}>
              {i.title}
            </MenuItem>
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
      <div style={{ width: '320px', backgroundColor: '#151515'}}>
      <NavButton onClick={handleOpen} className={`navButton ${navbarVisibility ? " hideButton" : " "}`}>{"Open"}</NavButton>
        <MenuNav id="Hi bibi" className={`menuNav ${navbarVisibility ? " showMenu" : ""}`} aria-label="menu-vertical" vertical align="spaceBetween" overrides={{spaceInline: 'space000', width: '100%'}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Block paddingInline="space070"
                  paddingBlock="space010">
          <Button overrides={{stylePreset: "buttonSolidSecondary"}} onClick={handleClose}>X
          </Button>
        </Block>
        <img style={{ height: '30px'}} src="https://globalstore.thetimes.co.uk/wp-content/themes/wp-storefront-global/imgs/TOL-masterhead-2017_white_logo.png"></img>
        </div>
        {getNavButtons()}
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
        </div>
      </ThemeProvider>
  )
}