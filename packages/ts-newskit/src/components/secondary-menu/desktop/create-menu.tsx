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
  const navListContainerRef = useRef<HTMLDivElement>(null);
  const contanierRef = useRef<HTMLDivElement>(null);
  const { isExpanded, setIsExpanded } = options;
  const { moreMenuLength, menuItems, breakpointKey } = getBreakpoint(data);
  const [moreMenuItemsLength, setMoreMenuItemsLength] = useState<number>(0);
  const [hasMenuItem, setHasMenuItem] = useState<number>(data.length);

    const getWidth = (el: any) => el.clientWidth

    useEffect(() => {
    setMoreMenuItemsLength(0);
    setHasMenuItem(data.length);



      const updateNav = (navAdjustCount = 1) => {
        const navListContainerWidth = getWidth(contanierRef.current);
        const navListWidth = getWidth(navListContainerRef.current);

        if(navListWidth && navListContainerWidth) {
          console.log("contanierRef: ", navListContainerWidth);
          console.log("navListContainer: ", navListWidth);
          console.log("called");

          if(navListWidth > navListContainerWidth - 150) {
            console.log("updated", navAdjustCount);
            console.log("moreMenuLength", moreMenuLength);
            console.log("menuItems", menuItems);

            setMoreMenuItemsLength(moreMenuLength + navAdjustCount);
            setHasMenuItem(menuItems - navAdjustCount);

            setTimeout(() => updateNav(navAdjustCount + 1), 1000);
          } 
        }
        // else {
        //   console.log("updated", navAdjustCount);
        //   setMoreMenuItemsLength(moreMenuLength - 2);
        //   setHasMenuItem(menuItems + 2);
        //   // updateNav(navAdjustCount + 1);
        // }
      }
  
      updateNav();
      // setTimeout(() => updateNav(), 1000);

      // if (ref.current) {
      //   if (
      //     ref.current.offsetWidth < 900 &&
      //     breakpointKey === 'lg' &&
      //     data.length < 10
      //   ) {
      //     setMoreMenuItemsLength(moreMenuLength - 1);
      //     setHasMenuItem(menuItems + 1);
      //   } else if (ref.current.offsetWidth > 532 && breakpointKey === 'lg') {
      //     setMoreMenuItemsLength(moreMenuLength + 1);
      //     setHasMenuItem(menuItems - 1);
      //   } else if (
      //     ref.current.offsetWidth > 540 &&
      //     ref.current.offsetWidth < 645 &&
      //     breakpointKey === 'md'
      //   ) {
      //     setMoreMenuItemsLength(moreMenuLength - 1);
      //     setHasMenuItem(menuItems + 1);
      //   } else if (
      //     ref.current.offsetWidth > 645 &&
      //     breakpointKey === 'md' &&
      //     data.length < 7
      //   ) {
      //     setMoreMenuItemsLength(moreMenuItemsLength + 1);
      //     setHasMenuItem(hasMenuItem - 1);
      //   } else if (ref.current.offsetWidth > 645 && breakpointKey === 'md') {
      //     setMoreMenuItemsLength(moreMenuLength + 1);
      //     setHasMenuItem(menuItems - 1);
      //   } else {
      //     setMoreMenuItemsLength(moreMenuLength);
      //     setHasMenuItem(menuItems);
      //   }
      // }
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
        <Wrapper ref={navListContainerRef} data-testid="navitems-test-id">
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
