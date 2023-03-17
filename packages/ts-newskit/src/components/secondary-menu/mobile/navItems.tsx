import React from 'react';
import { MenuItem } from 'newskit';
import { NavItemsContainer } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { handleSelect } = options;

  return (
    <NavItemsContainer>
      {data.map(({ url, slug, title }) => (
        <MenuItem
          overrides={{
            stylePreset: 'secondaryMenuItem',
            typographyPreset: 'newPreset020'
          }}
          href={url}
          id={`vertical-${slug}`}
          onClick={() => handleSelect(title)}
          key={slug}
        >
          {title}
        </MenuItem>
      ))}
    </NavItemsContainer>
  );
};
