import React from 'react';
import { MenuItem } from 'newskit';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  hasMenuItem: number;
}> = ({ options, data, hasMenuItem }) => {
  const { handleSelect, isSelected } = options;

  return (
    <>
      {data.slice(0, hasMenuItem).map(({ title, url }) => (
        <MenuItem
          overrides={{
            stylePreset: 'menuItemDesktop',
            typographyPreset: 'newPreset040'
          }}
          href={url}
          key={url}
          onClick={() => handleSelect(title)}
          selected={isSelected === title}
        >
          {title}
        </MenuItem>
      ))}
    </>
  );
};
