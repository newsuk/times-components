
import React, { useState } from 'react';
import { MenuDivider, Block, IconButton, Visible } from 'newskit';
import { ThemeProvider } from 'newskit/esm/theme';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import { NewsKitMasthead, NewsKitCloseIcon } from './icons';
import { MenuNav } from './styles';
import NavButtonSection from './NavButtons'
import NavItems from './NavItems';

import { TimesWebLightTheme } from '../../theme';

export const HamburgerMenu: React.FC<{}> = ({ loggedIn, handleClose, navbarVisibility }) => {
  const [expandedL1, setExpandedL1] = useState('');
  const [navigationData, setNavigationData] = useState(mainNavItems)
  
  const onExpand = (slug) => (
    setExpandedL1(slug)
  )

  const handleClickMain = () => (
    setNavigationData(mainNavItems)
  );
  const handleClickAccount = () => (
    setNavigationData(accountItems)
  );

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MenuNav className={`menuNav ${navbarVisibility ? " showMenu" : ""}`} aria-label="menu-vertical" vertical align="spaceBetween" overrides={{spaceInline: 'space000'}}>
        <Visible xs sm>
          <Block stylePreset="anotherBlock">
            <IconButton overrides={{stylePreset: "buttonMinimalSecondary", width: '50px', height: '50px'}} onClick={handleClose}>
              <NewsKitCloseIcon />
            </IconButton>
            <NewsKitMasthead />
          </Block>
          <Block marginBlock="space030">
            <NavButtonSection navigationData={navigationData} loggedIn={loggedIn} handleClickMain={handleClickMain} handleClickAccount={handleClickAccount}/>
          </Block>
        </Visible>
        <NavItems data={navigationData.menuItems} onExpand={onExpand} expandedL1={expandedL1}/>
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
      </MenuNav>
    </ThemeProvider>
  );
};