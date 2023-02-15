import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock, ThemeProvider } from 'newskit';
import NavButtonSection from './NavButtons';
import NavigationList from './NavigationList';
import { MenuNav } from './styles';
import { TimesWebLightTheme } from '../../theme';

type MenuItemL2 = {
  title: string;
  url: string;
  slug: string;
};

type MenuItemL1 = {
  title: string;
  url: string;
  slug: string;
  items?: MenuItemL2[];
};

type NavigationData = {
  mainMenuItems: MenuItemL1[];
  moreMenuItems: MenuItemL1[];
  accountMenuItems: MenuItemL1[];
};

const HamburgerMenu: React.FC<{ loggedIn: boolean; data: NavigationData }> = ({
  loggedIn,
  data
}) => {
  const mainNavigation = 'Sections';
  const secondaryNavigation = 'My account';

  const [expandedL1, setExpandedL1] = useState<string>('');
  const [selected, setSelected] = useState(mainNavigation);

  const onExpand = (slug: string) => setExpandedL1(slug);

  const clickHandler = (title: string) => {
    if (title === mainNavigation) {
      return setSelected(mainNavigation);
    } else {
      return setSelected(secondaryNavigation);
    }
  };

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MenuNav
        aria-label="menu-vertical"
        vertical
        align="spaceBetween"
        overrides={{ spaceInline: 'space000' }}
      >
        <Visible xs sm>
          <NavButtonSection
            loggedIn={loggedIn}
            handleClick={clickHandler}
            selected={selected}
          />
        </Visible>
        <NavigationList
          data={
            selected === mainNavigation
              ? data.mainMenuItems
              : data.accountMenuItems
          }
          onExpand={onExpand}
          expandedL1={expandedL1}
        />
        {selected === mainNavigation ? (
          <>
            <Block
              stylePreset="blockWrapper"
              paddingInline="space040"
              paddingBlock="space040"
            >
              <TextBlock
                typographyPreset="newPreset010"
                style={{ fontSize: '14px' }}
              >
                More
              </TextBlock>
            </Block>
            <MenuDivider />
            <NavigationList data={data.moreMenuItems} />
          </>
        ) : null}
      </MenuNav>
    </ThemeProvider>
  );
};

export default HamburgerMenu;
