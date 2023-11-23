import React, { useEffect, useRef } from 'react';
import { Menu } from 'newskit';
import { MenuContainer, Wrapper, MainMenu, StyledMenuSub } from '../styles';
import { SecondaryMenuOptions, ResponsiveSecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: ResponsiveSecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  const contanierRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const { isExpanded, setIsExpanded } = options;

  const subMenuTitle = isExpanded ? 'Less' : 'More';

  useEffect(
    () => {
      const unsetExpanded = () => setIsExpanded(false);
      const checkIfClickedOutside = (e: any) => {
        if (
          isExpanded &&
          contanierRef.current &&
          !contanierRef.current.contains(e.target)
        ) {
          unsetExpanded();
        }
      };

      document.addEventListener('click', checkIfClickedOutside);
      window.addEventListener('resize', unsetExpanded);
      return () => {
        document.removeEventListener('click', checkIfClickedOutside);
        window.addEventListener('resize', unsetExpanded);
      };
    },
    [isExpanded]
  );

  let charWidth = 0;
  let showMoreMD = false;
  let showMoreLG = false;
  let showMoreXL = false;
  data.map(({ title }, index) => {
    if (title.length * 10 + charWidth > 1270) {
      data[index].xl = true;
      showMoreXL = true;
    }
    if (title.length * 10 + charWidth > 970) {
      data[index].lg = true;
      showMoreLG = true;
    }
    if (title.length * 10 + charWidth > 700) {
      data[index].md = true;
      showMoreMD = true;
    }
    charWidth += title.length * 10 + 32;
  });

  return (
    <MainMenu
      aria-label="Secondary Navigation"
      overrides={{
        spaceInline: 'space000'
      }}
      ref={contanierRef}
    >
      <Wrapper ref={navListRef}>
        <NavItems data={data} options={options} clickHandler={clickHandler} />
      </Wrapper>
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
        $showMoreMD={showMoreMD}
        $showMoreLG={showMoreLG}
        $showMoreXL={showMoreXL}
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
              clickHandler={clickHandler}
            />
          </Menu>
        </MenuContainer>
      </StyledMenuSub>
    </MainMenu>
  );
};
