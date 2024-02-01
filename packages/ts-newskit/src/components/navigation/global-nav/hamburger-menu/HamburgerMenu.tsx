// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { useState } from 'react';
import { MenuDivider, Block, Visible, TextBlock } from 'newskit';
import NavigationList from './NavigationList';
import { HamburgerMenuNav } from '../styles';
import { NavigationData } from '../types';
import NavSearch from '../search/search';
import NavButtonSection from './NavButtons';

export const HamburgerMenu: React.FC<{
  isLoggedIn?: boolean;
  data: NavigationData;
  hamburgerClickHandler: (title: string) => void;
}> = ({ isLoggedIn, data, hamburgerClickHandler }) => {
  const mainNavigation = 'Sections';

  const [expandedL1, setExpandedL1] = useState<string>('');

  const [selected, setSelected] = useState(mainNavigation);

  return (
    <HamburgerMenuNav
      aria-label="menu-vertical"
      vertical
      align="spaceBetween"
      overrides={{ spaceInline: 'space000' }}
    >
      <Visible xs sm>
        <Block
          paddingInline="space040"
          marginBlock="space040"
          role="region"
          aria-label="Search Bar"
        >
          <NavSearch isHamburger />
        </Block>
        {isLoggedIn && (
          <NavButtonSection
            setSelected={setSelected}
            selected={selected}
            clickHandler={hamburgerClickHandler}
          />
        )}
      </Visible>
      <NavigationList
        data={
          selected === mainNavigation
            ? data.mainMenuItems
            : data.accountMenuItems
        }
        onExpand={setExpandedL1}
        expandedL1={expandedL1}
        clickHandler={hamburgerClickHandler}
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
          <NavigationList
            data={data.moreMenuItems}
            clickHandler={hamburgerClickHandler}
          />
        </>
      ) : null}
    </HamburgerMenuNav>
  );
};

export default HamburgerMenu;
