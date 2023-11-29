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
