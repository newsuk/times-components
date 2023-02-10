// @ts-nocheck
import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock, ThemeProvider } from 'newskit';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import NavButtonSection from './NavButtons'
import NavItems from './NavItems';
import { MenuNav } from './styles';

import { TimesWebLightTheme } from '../../theme';

export const HamburgerMenu: React.FC<{}> = ({ loggedIn }) => {
  const [expandedL1, setExpandedL1] = useState('');
  const [navigationData, setNavigationData] = useState(mainNavItems)
  
  const onExpand = (slug: string) => (
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
      <MenuNav aria-label="menu-vertical" vertical align="spaceBetween" overrides={{ spaceInline: 'space000' }}>
        <Visible xs sm>
            <NavButtonSection navigationData={navigationData} loggedIn={loggedIn} handleClickMain={handleClickMain} handleClickAccount={handleClickAccount}/>
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