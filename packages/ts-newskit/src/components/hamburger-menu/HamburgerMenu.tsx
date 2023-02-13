import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock, ThemeProvider } from 'newskit';
import mainNavItems from './fixtures/menu-items.json';
import navdata from './fixtures/data.json';
import accountItems from './fixtures/account-items.json';
import NavButtonSection from './NavButtons'
import NavItems from './NavItems';
import { MenuNav } from './styles';


import { TimesWebLightTheme } from '../../theme';

type MenuItemL2 = {
  title: string,
  url: string,
  slug: string
}

type MenuItemL1 = {
    title: string,
    url: string
    slug: string,
    items?: MenuItemL2[]
}

type NavigationData = {
  mainMenuItems: MenuItemL1[],
  moreMenuItems: MenuItemL1[],
  accountMenuItems: MenuItemL1[],
}

const HamburgerMenu: React.FC<{ loggedIn: boolean, data: NavigationData }> = ({ loggedIn, data }) => {
  console.log(data, 'DATA');
  const [expandedL1, setExpandedL1] = useState<string>('');
  const [selected, setSelected] = useState('Sections');

  console.log(selected, 'SELECTED')
  
  const onExpand = (slug: string) => (
    setExpandedL1(slug)
  );

  const handleClickAccount = () => {
      setSelected('My account')
  };

  const handleClickMain = () => {
    setSelected('Sections')
  };

const clickHandler = (title: string) => {
  if(title === 'Sections') {
    return handleClickMain();
  }
  else return handleClickAccount();
}
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MenuNav aria-label="menu-vertical" vertical align="spaceBetween" overrides={{ spaceInline: 'space000' }}>
        <Visible xs sm>
            <NavButtonSection loggedIn={loggedIn} handleClick={clickHandler} selected={selected}/>
        </Visible>
        <NavItems data={selected === 'Sections' ? data.mainMenuItems : data.accountMenuItems} onExpand={onExpand} expandedL1={expandedL1}/>
          {
            selected === 'Sections' ? (
              <>
                <Block stylePreset="blockWrapper"
                  paddingInline="space040"
                  paddingBlock="space040">
                  <TextBlock typographyPreset="newPreset010" style={{ fontSize: '14px'}}>More</TextBlock>
                </Block>
                <MenuDivider />
                <NavItems data={data.moreMenuItems} onExpand={() => {}}/>
              </>
            ) : null}
      </MenuNav>
    </ThemeProvider>
  );
};

export default HamburgerMenu;