import React, { useEffect, useState, useRef } from 'react';
import { MenuSub, Menu } from 'newskit';
import { MenuContainer, Container, Wrapper, MainMenu } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const contanierRef = useRef<HTMLDivElement>(null);
  const { isExpanded, setIsExpanded } = options;
  const { moreMenuLength, menuItems, breakpointKey } = getBreakpoint(data);
  const [moreMenuItemsLength, setMoreMenuItemsLength] = useState<number>(0);
  const [hasMenuItem, setHasMenuItem] = useState<number>(data.length);

  useEffect(
    () => {
      if (ref.current) {
        if (
          ref.current.offsetWidth < 900 &&
          breakpointKey === 'lg' &&
          data.length < 10
        ) {
          setMoreMenuItemsLength(moreMenuLength - 1);
          setHasMenuItem(menuItems + 1);
        } else if (ref.current.offsetWidth > 532 && breakpointKey === 'lg') {
          setMoreMenuItemsLength(moreMenuLength + 1);
          setHasMenuItem(menuItems - 1);
        } else if (
          ref.current.offsetWidth > 540 &&
          ref.current.offsetWidth < 645 &&
          breakpointKey === 'md'
        ) {
          setMoreMenuItemsLength(moreMenuLength - 1);
          setHasMenuItem(menuItems + 1);
        } else if (
          ref.current.offsetWidth > 645 &&
          breakpointKey === 'md' &&
          data.length < 7
        ) {
          setMoreMenuItemsLength(moreMenuItemsLength + 1);
          setHasMenuItem(hasMenuItem - 1);
        } else if (ref.current.offsetWidth > 645 && breakpointKey === 'md') {
          setMoreMenuItemsLength(moreMenuLength + 1);
          setHasMenuItem(menuItems - 1);
        } else {
          setMoreMenuItemsLength(moreMenuLength);
          setHasMenuItem(menuItems);
        }
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
        <Wrapper ref={ref} data-testid="navitems-test-id">
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
