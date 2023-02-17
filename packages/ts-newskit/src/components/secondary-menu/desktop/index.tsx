import React from 'react';
import { MenuItem } from 'newskit';
import { MenuDivider, MainMenu } from '../styles';
import { SecondaryMenuItem } from '../types';

export const SecondaryNavDesktop: React.FC<{
  data: SecondaryMenuItem[];
  isSelected: string;
  handleSelect: (value: string) => void;
}> = ({ data, isSelected, handleSelect }) => {
  return (
    <>
      <MainMenu
        aria-label="Secondary Navigation"
        overrides={{ spaceInline: 'space050' }}
        align="center"
      >
        {data.map(item => (
          <MenuItem
            overrides={{ stylePreset: 'menuItemDesktop' }}
            href={item.url}
            selected={isSelected === item.title}
            onClick={() => handleSelect(item.title)}
            key={item.slug}
          >
            {item.title}
          </MenuItem>
        ))}
      </MainMenu>
      <MenuDivider />
    </>
  );
};
