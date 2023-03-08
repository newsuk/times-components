import React, { useEffect, useState, useRef } from 'react';
import { MenuSub, Menu } from 'newskit';
import { MenuContainer, Container, Wrapper, MainMenu } from '../styles';
import {
  SecondaryMenuOptions,
  SecondaryMenuItem,
  seeAllButtonWidth
} from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const contanierRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const { isExpanded, setIsExpanded } = options;
  const { moreMenuLength, menuItems, breakpointKey } = getBreakpoint(data);
  const [moreMenuItemsLength, setMoreMenuItemsLength] = useState<number>(
    moreMenuLength
  );
  const [hasMenuItem, setHasMenuItem] = useState<number>(menuItems);
  const getWidth = (el: any) => el.clientWidth;

  useEffect(
    () => {
      if (breakpointKey !== 'sm' && breakpointKey !== 'xs') {
        setMoreMenuItemsLength(moreMenuLength);
        setHasMenuItem(menuItems);
        const updateNav = (navAdjustCount = 1) => {
          setTimeout(() => {
            const navListContainerWidth = getWidth(contanierRef.current);
            const navListWidth = getWidth(navListRef.current);
            if (
              navListWidth >
              navListContainerWidth - seeAllButtonWidth[breakpointKey]
            ) {
              setMoreMenuItemsLength(moreMenuLength + navAdjustCount);
              setHasMenuItem(menuItems - navAdjustCount);
              updateNav(navAdjustCount + 1);
            }
          }, 1000);
        };
        updateNav();
      }
    },
    [breakpointKey]
  );

  useEffect(
    () => {
      const checkIfClickedOutside = (e: any) => {
        if (
          isExpanded &&
          contanierRef.current &&
          !contanierRef.current.contains(e.target)
        ) {
          setIsExpanded(!isExpanded);
        }
      };
      document.addEventListener('click', checkIfClickedOutside);
      return () => {
        document.removeEventListener('click', checkIfClickedOutside);
      };
    },
    [isExpanded]
  );

  return (
    <MainMenu
      hasMoreItems={moreMenuItemsLength > 0 ? true : false}
      aria-label="Secondary Navigation"
      overrides={{
        spaceInline: 'space050'
      }}
    >
      <Container ref={contanierRef} moreMenuItemsLength={moreMenuItemsLength}>
        <Wrapper ref={navListRef} data-testid="navitems-test-id">
          <NavItems data={data} options={options} hasMenuItem={hasMenuItem} />
        </Wrapper>
        {moreMenuItemsLength > 0 && (
          <MenuSub
            onClick={() => setIsExpanded(!isExpanded)}
            expanded={isExpanded}
            title="See all"
            overrides={{
              stylePreset: `${
                isExpanded ? 'subMenuPreset2' : 'subMenuPreset1'
              }`,
              list: { stylePreset: 'subMenuItems' },
              typographyPreset: 'newPreset040'
            }}
            data-testid="more-sub-menu"
          >
            <MenuContainer>
              <Menu
                vertical
                overrides={{
                  spaceInline: 'sizing000'
                }}
                aria-label="menu-multiple-auto"
              >
                <CreateMoreMenu
                  data={data}
                  options={options}
                  moreMenuItemsLength={moreMenuItemsLength}
                />
              </Menu>
            </MenuContainer>
          </MenuSub>
        )}
      </Container>
    </MainMenu>
  );
};
