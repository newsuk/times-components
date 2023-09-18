import React from 'react';
import { NavItemsContainer, SecondaryNavMenuItemMob } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { handleSelect, isSelected } = options;

  return (
    <NavItemsContainer>
      {data.map(({ url, slug, title }) => (
        <SecondaryNavMenuItemMob
          overrides={{
            paddingInline: 'space060',
            marginBlockStart: '-2px',
            marginInlineEnd: '-2px',
            stylePreset: 'secondaryMenuItem',
            typographyPreset: 'secondaryNavMenuItemMob'
          }}
          href={url}
          id={`vertical-${slug}`}
          onClick={() => handleSelect(slug)}
          key={slug}
          isSelected={isSelected === title}
        >
          {title}
        </SecondaryNavMenuItemMob>
      ))}
    </NavItemsContainer>
  );
};
