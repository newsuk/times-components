import React from 'react';
import { MenuItem } from 'newskit';
import { NavItemsContainer } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { handleSelect } = options;
  const menuItemsPreset = {
    stylePreset: 'secondaryMenuItem'
  };

  return (
    <NavItemsContainer>
      {data.map(item => (
        <MenuItem
          overrides={{
            ...menuItemsPreset,
            typographyPreset: 'newPreset020'
          }}
          href={item.url}
          id={`vertical-${item.slug}`}
          onClick={() => handleSelect(item.title)}
          key={item.slug}
        >
          {item.title}
        </MenuItem>
      ))}
    </NavItemsContainer>
  );
};
