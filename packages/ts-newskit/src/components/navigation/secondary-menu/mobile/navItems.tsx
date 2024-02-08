// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { NavItemsContainer, SecondaryNavMenuItemMob } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
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
          onClick={() => {
            handleSelect(slug);
            clickHandler(title);
          }}
          key={slug}
          isSelected={isSelected === title}
        >
          {title}
        </SecondaryNavMenuItemMob>
      ))}
    </NavItemsContainer>
  );
};
