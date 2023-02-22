import React from 'react';
import { MenuItem } from 'newskit';
import { SecondaryMenuItem } from '../types';
import { useBreakpoint } from '../../utils/test';

export const NavItems: React.FC<{
  data: SecondaryMenuItem[];
  isSelected: string;
  handleSelect: (value: string) => void;
}> = ({ data, handleSelect, isSelected }) => {
  const { menuItems } = useBreakpoint(data);

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
