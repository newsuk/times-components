import React, { useRef, useEffect, useState } from 'react';
import { Menu } from 'newskit';
import { Navigator } from './navigator';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { NavItemsMobileContainer } from '../styles';

export const SecondaryNavMobile: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  onClick?: (isExpanded: boolean) => void;
}> = ({ options, data, onClick }) => {
  const { isExpanded, isSelected } = options;
  const subMenuTitle = isExpanded ? 'Close' : 'See all';
  const navRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>('auto');

  useEffect(
    () => {
      if (navRef && navRef.current) {
        if (
          window.innerHeight <= navRef.current.getBoundingClientRect().bottom
        ) {
          setHeight(
            `${window.innerHeight -
              navRef.current.getBoundingClientRect().top}px`
          );
        } else {
          setHeight('100vh');
        }
      }
    },
    [navRef && navRef.current]
  );

  return (
    <Menu
      vertical
      aria-label="Secondary Navigation"
      overrides={{
        spaceInline: 'space000'
      }}
    >
      <Navigator
        title={isSelected}
        options={options}
        subMenuTitle={subMenuTitle}
        onClick={onClick}
      />
      {isExpanded ? (
        <NavItemsMobileContainer $height={height} ref={navRef}>
          <NavItems data={data} options={options} />
        </NavItemsMobileContainer>
      ) : null}
    </Menu>
  );
};
