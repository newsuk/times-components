import React, { useRef, useEffect, useState } from 'react';
import { Menu } from 'newskit';
import { Navigator } from './navigator';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { NavItemsMobileContainer } from '../styles';

export const SecondaryNavMobile: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  title: string;
  onClick?: (isExpanded: boolean) => void;
  height?: string;
  clickHandler: (title: string) => void;
}> = ({ options, data, title, onClick, height = 'auto', clickHandler }) => {
  const { isExpanded } = options;
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<string>(height);

  useEffect(
    () => {
      if (navRef && navRef.current) {
        if (
          window.innerHeight <= navRef.current.getBoundingClientRect().bottom
        ) {
          setNavHeight(
            `${window.innerHeight -
              navRef.current.getBoundingClientRect().top}px`
          );
        } else {
          setNavHeight(height);
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
        title={`See all ${title}`}
        options={options}
        onClick={onClick}
      />
      {isExpanded ? (
        <NavItemsMobileContainer $height={navHeight} ref={navRef}>
          <NavItems data={data} options={options} clickHandler={clickHandler} />
        </NavItemsMobileContainer>
      ) : null}
    </Menu>
  );
};
