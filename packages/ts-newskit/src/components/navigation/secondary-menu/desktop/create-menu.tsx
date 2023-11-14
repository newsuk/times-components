import React, { useEffect, useRef } from 'react';
import { Menu } from 'newskit';
import {
  MenuContainer,
  Wrapper,
  MainMenu,
  StyledMenuSub,
  VisibleCheckContainer
} from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
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
      data={data}
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
          clickHandler={clickHandler}
        />
      </Wrapper>
      <VisibleCheckContainer data={data}>
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
                clickHandler={clickHandler}
              />
            </Menu>
          </MenuContainer>
        </StyledMenuSub>
      </VisibleCheckContainer>
    </MainMenu>
  );
};
