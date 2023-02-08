
import React, { useState } from 'react';
import { MenuSub, MenuItem, MenuDivider, Block, IconButton } from 'newskit';
import { ThemeProvider } from 'newskit/esm/theme';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import { NewsKitMasthead, NewsKitCloseIcon } from './icons';
import { MenuNav } from './styles';
import NavButtonSection from './NavButtons'

import { TimesWebLightTheme } from '../../theme';

export const HamburgerMenu: React.FC<{}> = ({ loggedIn, handleClose, navbarVisibility }) => {
  const [expandedL1, setExpandedL1] = useState('');
  const [navigationData, setNavigationData] = useState(mainNavItems)
  const handleClickMain = () => (
    setNavigationData(mainNavItems)
  );
  const handleClickAccount = () => (
    setNavigationData(accountItems)
  );

  const L1Overrides = {
        stylePreset: 'menuItemL1',
      };
  const L2Overrides = {
    stylePreset: 'menuItemL2'
  };

  const NavItems = ({ data }) => (
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
              <MenuItem href={i.url} id={`vertical-${i.slug}`} overrides={{...L2Overrides}}>
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
        <Block marginBlock={'space030'}>
        <NavButtonSection navigationData={navigationData} loggedIn={loggedIn} handleClickMain={handleClickMain} handleClickAccount={handleClickAccount}/>
        </Block>
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