// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { SecondaryMenuOptions, ResponsiveSecondaryMenuItem } from '../types';
import { StyledMenuItemsDesktop } from '../styles';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: ResponsiveSecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  const { handleSelect, isSelected } = options;

  const handleClick = (slug: string, title: string) => {
    handleSelect(slug);
    clickHandler(title);
  };

  return (
    <>
      {data.map(({ title, slug, url, md, lg, xl }) => (
        <StyledMenuItemsDesktop
          overrides={{
            paddingInline: 'space040',
            stylePreset: 'menuItemDesktop',
            typographyPreset: 'newPreset040'
          }}
          href={url}
          key={url}
          onClick={() => handleClick(slug, title)}
          selected={isSelected === title}
          $hideMD={md}
          $hideLG={lg}
          $hideXL={xl}
        >
          {title}
        </StyledMenuItemsDesktop>
      ))}
    </>
  );
};
