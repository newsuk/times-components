import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock, ThemeProvider } from 'newskit';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import NavButtonSection from './NavButtons'
import NavItems from './NavItems';
import { MenuNav } from './styles';

import { TimesWebLightTheme } from '../../theme';

type NavigationItemItem = {
  title: string,
  url: string,
  slug: string
} 

type NavigationItem = {
  title: string,
  url: string
  slug: string,
  items?: NavigationItemItem[]
}

type NavigationData = {
  menuItems: NavigationItem[],
  moreMenuItems?: NavigationItem[]
}

const HamburgerMenu: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => {
  const [expandedL1, setExpandedL1] = useState<string>('');
  const [navigationData, setNavigationData] = useState<NavigationData>(mainNavItems)
  const [selected, setSelected] = useState('Sections');
  
  const onExpand = (slug: string) => (
    setExpandedL1(slug)
  )

  const handleClickAccount = () => {
    setSelected('My account')
    setNavigationData(accountItems)
  };

  const handleClickMain = () => {
    setSelected('Sections')
    setNavigationData(mainNavItems)
  };
 

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MenuNav aria-label="menu-vertical" vertical align="spaceBetween" overrides={{ spaceInline: 'space000' }}>
        <Visible xs sm>
            <NavButtonSection loggedIn={loggedIn} handleClickMain={handleClickMain} handleClickAccount={handleClickAccount} selected={selected}/>
        </Visible>
        <NavItems data={navigationData.menuItems} onExpand={onExpand} expandedL1={expandedL1}/>
          {
            navigationData.moreMenuItems ? (
              <>
                <Block stylePreset="blockWrapper"
                  paddingInline="space040"
                  paddingBlock="space040">
                  <TextBlock typographyPreset="newPreset010" style={{ fontSize: '14px'}}>More</TextBlock>
                </Block>
                <MenuDivider />
                <NavItems data={navigationData.moreMenuItems}/>
              </>
            ) : null}
      </MenuNav>
    </ThemeProvider>
  );
};

export default HamburgerMenu;