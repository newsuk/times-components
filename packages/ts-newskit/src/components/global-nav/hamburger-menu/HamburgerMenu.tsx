import React from 'react';
import { MenuDivider, Block, Visible, TextBlock } from 'newskit';
import NavButtonSection from './NavButtons';
import NavigationList from './NavigationList';
import { HamburgerMenuNav } from '../styles';
import { NavigationData } from '../types';

export const HamburgerMenu: React.FC<{
  isLoggedIn?: boolean;
  data: NavigationData;
  expandedL1: string;
  selected: string;
  setExpandedL1: (title: string) => void;
  setSelected: (title: string) => void;
  mainNavigation: string;
}> = ({ isLoggedIn, data, expandedL1, selected, setExpandedL1, setSelected, mainNavigation }) => {
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
          setSelected={setSelected}
          selected={selected}
        />
      </Visible>
      <NavigationList
        data={
          selected === mainNavigation
            ? data.mainMenuItems
            : data.accountMenuItems
        }
        onExpand={setExpandedL1}
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
