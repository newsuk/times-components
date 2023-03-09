import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock } from 'newskit';
import NavButtonSection from './NavButtons';
import NavigationList from './NavigationList';
import { HamburgerMenuNav } from '../styles';
import { NavigationData } from '../types';

const HamburgerMenu: React.FC<{
  isLoggedIn?: boolean;
  data: NavigationData;
}> = ({ isLoggedIn, data }) => {
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
    <HamburgerMenuNav
      aria-label="menu-vertical"
      vertical
      align="spaceBetween"
      overrides={{ spaceInline: 'space000' }}
    >
      <Visible xs sm>
        <NavButtonSection
          loggedIn={isLoggedIn}
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
            <TextBlock typographyPreset="newPreset010">More</TextBlock>
          </Block>
          <MenuDivider />
          <NavigationList data={data.moreMenuItems} />
        </>
      ) : null}
    </HamburgerMenuNav>
  );
};

export default HamburgerMenu;
