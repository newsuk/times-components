import React, { Fragment, useEffect, useState, useRef } from 'react';
import { MenuSub, Menu } from 'newskit';
import { MenuContainer, Container, Wrapper } from '../styles';
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
        if (ref.current.offsetWidth > 532 && breakpointKey === 'lg') {
          setMoreMenuItemsLength(moreMenuLength + 1);
          setHasMenuItem(menuItems - 1);
        } else if (
          ref.current.offsetWidth > 633 &&
          breakpointKey === 'md' &&
          data.length < 7
        ) {
          setMoreMenuItemsLength(moreMenuItemsLength + 2);
          setHasMenuItem(hasMenuItem - 2);
        } else if (ref.current.offsetWidth > 633 && breakpointKey === 'md') {
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
    <Fragment>
      <Container ref={contanierRef} moreMenuItemsLength={moreMenuItemsLength}>
        <Wrapper ref={ref}>
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
    </Fragment>
  );
};
