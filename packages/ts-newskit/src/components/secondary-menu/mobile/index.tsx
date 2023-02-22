import React from 'react';
import { Menu } from 'newskit';
import { Navigator } from './navigator';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';

export const SecondaryNavMobile: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { isExpanded, isSelected } = options;
  const subMenuTitle = isExpanded ? 'Close' : 'See all';

  return (
    <Menu vertical aria-label="Secondary Navigation">
      <Navigator
        title={isSelected}
        options={options}
        subMenuTitle={subMenuTitle}
      />
      {isExpanded ? <NavItems data={data} options={options} /> : null}
    </Menu>
  );
};
