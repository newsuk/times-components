import React from 'react';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { StyledMenuItemsDesktop, menuItemDesktopStylePreset } from '../styles';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  hasMenuItem: number;
}> = ({ options, data, hasMenuItem }) => {
  const { handleSelect, isSelected } = options;

  return (
    <>
      {data.slice(0, hasMenuItem).map(({ title, url }) => (
        <StyledMenuItemsDesktop
          overrides={{
            ...menuItemDesktopStylePreset,
            typographyPreset: 'newPreset040'
          }}
          href={url}
          key={url}
          onClick={() => handleSelect(title)}
          selected={isSelected === title}
        >
          {title}
        </StyledMenuItemsDesktop>
      ))}
    </>
  );
};
