import React, { useEffect, useState, useRef } from 'react';
import { Menu } from 'newskit';
import { MenuContainer, Wrapper, MainMenu, StyledMenuSub } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';
import { debounce, getWidth } from '../../../../utils';

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const contanierRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const { isExpanded, setIsExpanded } = options;
  const [hasMenuItem, setHasMenuItem] = useState<number>(data.length);
  const [moreMenuItemsLength, setMoreMenuItemsLength] = useState<number>(0);
  const subMenuTitle = isExpanded ? 'Less' : 'More';

  useEffect(() => {
    const handleResize = async (navAdjustCount = 1) => {
      setMoreMenuItemsLength(moreMenuItemsLength);
      setHasMenuItem(hasMenuItem);

      const navListContainerWidth = await getWidth(contanierRef.current);
      const navListWidth = await getWidth(navListRef.current);

      if (
        navListWidth > navListContainerWidth - 200 &&
        navListWidth > 0 &&
        navListContainerWidth > 0
      ) {
        setMoreMenuItemsLength(moreMenuItemsLength + navAdjustCount);
        setHasMenuItem(hasMenuItem - navAdjustCount);

        const updatedNavListWidth = await getWidth(navListRef.current);
        updatedNavListWidth > navListContainerWidth - 200 &&
          handleResize(navAdjustCount + 1);
      }
    };

    window.addEventListener('resize', debounce(() => handleResize(), 500));
    handleResize();

    return () => {
      window.removeEventListener('resize', debounce(() => handleResize(), 500));
    };
  }, []);

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
        spaceInline: 'space030'
      }}
      ref={contanierRef}
    >
      <Wrapper ref={navListRef}>
        <NavItems data={data} options={options} hasMenuItem={hasMenuItem} />
      </Wrapper>
      {moreMenuItemsLength > 0 && (
        <StyledMenuSub
          onClick={() => setIsExpanded(!isExpanded)}
          expanded={isExpanded}
          title={subMenuTitle}
          overrides={{
            paddingBlockStart: 'space020',
            paddingBlockEnd: 'space030',
            paddingInlineStart: 'space040',
            paddingInlineEnd: 'space040',
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
              />
            </Menu>
          </MenuContainer>
        </StyledMenuSub>
      )}
    </MainMenu>
  );
};
