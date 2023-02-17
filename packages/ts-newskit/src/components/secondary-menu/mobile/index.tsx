import React from 'react';
import { Menu } from 'newskit';
import { Navigator } from './navigator';
import { SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';

export const SecondaryNavMobile: React.FC<{
  data: SecondaryMenuItem[];
  isExpanded: boolean;
  isSelected: string;
  setIsExpanded: (value: boolean) => void;
  handleSelect: (value: string) => void;
}> = ({ data, isExpanded, setIsExpanded, isSelected, handleSelect }) => {
  const subMenuTitle = isExpanded ? 'Close' : 'See all';

  return (
    <Menu vertical aria-label="Secondary Navigation">
      <Navigator
        title={isSelected}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        subMenuTitle={subMenuTitle}
      />
      {isExpanded ? <NavItems data={data} handleSelect={handleSelect} /> : null}
    </Menu>
  );
};
