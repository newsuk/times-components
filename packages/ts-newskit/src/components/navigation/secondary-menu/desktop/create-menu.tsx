import React, { useEffect, useMemo, useRef } from 'react';
import { Menu, useBreakpointKey } from 'newskit';
import { MenuContainer, Wrapper, MainMenu, StyledMenuSub } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';

const MAX_NAV_ITEMS_CHAR_COUNT_MD = 55;
const MAX_NAV_ITEMS_CHAR_COUNT_LG = 75;
const MAX_NAV_ITEMS_CHAR_COUNT_XL = 100;

const getLastVisibleMenuItemIndex = (
  data: SecondaryMenuItem[],
  charCount: number
) => {
  let charCountSum = 0;
  for (let i = 0; i < data.length; i++) {
    charCountSum = charCountSum + data[i].title.length;
    if (charCountSum > charCount) {
      return i - 1;
    }
  }
  return data.length - 1;
};

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  const breakpoint = useBreakpointKey();
  const lastVisibleMenuItemIndex = useMemo(
    () => {
      let charCount = 0;
      console.log('breakpoint=======', breakpoint);
      if (!data) {
        return;
      } else {
        switch (breakpoint) {
          case 'xl':
            charCount = MAX_NAV_ITEMS_CHAR_COUNT_XL;
            break;
          case 'lg':
            charCount = MAX_NAV_ITEMS_CHAR_COUNT_LG;
            break;
          case 'md':
            charCount = MAX_NAV_ITEMS_CHAR_COUNT_MD;
            break;
        }
        console.log(
          '======inedx',
          getLastVisibleMenuItemIndex(data, charCount)
        );
        return getLastVisibleMenuItemIndex(data, charCount);
      }
    },
    [breakpoint, data]
  );
  const hasMoreItem = useMemo(
    () => lastVisibleMenuItemIndex !== data.length - 1,
    [lastVisibleMenuItemIndex]
  );
  const moreMenuItemsLength = useMemo(
    () => (hasMoreItem ? data.length - 1 - lastVisibleMenuItemIndex : 0),
    [hasMoreItem]
  );

  const contanierRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const { isExpanded, setIsExpanded } = options;

  const subMenuTitle = isExpanded ? 'Less' : 'More';

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
      hasMoreItems={!!hasMoreItem}
      aria-label="Secondary Navigation"
      overrides={{
        spaceInline: 'space000'
      }}
      ref={contanierRef}
    >
      <Wrapper ref={navListRef}>
        <NavItems
          data={data}
          options={options}
          hasMenuItem={lastVisibleMenuItemIndex + 1}
          clickHandler={clickHandler}
        />
      </Wrapper>
      {hasMoreItem && (
        <StyledMenuSub
          onClick={() => setIsExpanded(!isExpanded)}
          expanded={isExpanded}
          title={subMenuTitle}
          overrides={{
            paddingBlockStart: 'space020',
            paddingBlockEnd: 'space030',
            paddingInline: 'space040',
            stylePreset: `${isExpanded ? 'subMenuPreset2' : 'subMenuPreset1'}`,
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
                clickHandler={clickHandler}
              />
            </Menu>
          </MenuContainer>
        </StyledMenuSub>
      )}
    </MainMenu>
  );
};
