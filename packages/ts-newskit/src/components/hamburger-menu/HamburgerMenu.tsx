import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock, ThemeProvider } from 'newskit';
import NavButtonSection from './NavButtons'
import NavItems from './NavItems';
import { MenuNav, HamburgerContainer } from './styles';
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
  const [expandedL1, setExpandedL1] = useState<string>('');
  const [selected, setSelected] = useState('Sections');
  
  const onExpand = (slug: string) => (
    setExpandedL1(slug)
  );

const clickHandler = (title: string) => {
  if(title === 'Sections') {
    return setSelected('Sections')
  }
  else return setSelected('My account')
}

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <HamburgerContainer>
        <MenuNav aria-label="menu-vertical" vertical align="spaceBetween" overrides={{ spaceInline: 'space000' }}>
          <Visible xs sm>
              <NavButtonSection loggedIn={loggedIn} handleClick={clickHandler} selected={selected}/>
          </Visible>
          <NavItems data={selected === 'Sections' ? data.mainMenuItems : data.accountMenuItems} onExpand={onExpand} expandedL1={expandedL1}/>
            {
              selected === 'Sections' ? (
                <>
                  <Block 
                    stylePreset="blockWrapper"
                    paddingInline="space040"
                    paddingBlock="space040">
                    <TextBlock typographyPreset="newPreset010" style={{ fontSize: '14px'}}>More</TextBlock>
                  </Block>
                  <MenuDivider />
                  <NavItems data={data.moreMenuItems} onExpand={() => {}}/>
                </>
              ) : null}
        </MenuNav>
      </HamburgerContainer>
    </ThemeProvider>
  );
};

export default HamburgerMenu;