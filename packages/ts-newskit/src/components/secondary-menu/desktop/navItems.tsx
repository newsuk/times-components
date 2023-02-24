import React from 'react';
import { MenuItem } from 'newskit';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { handleSelect, isSelected } = options;
  const { menuItems } = getBreakpoint(data);

  return (
    <>
      {data.slice(0, menuItems).map(({ title, url }) => (
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
