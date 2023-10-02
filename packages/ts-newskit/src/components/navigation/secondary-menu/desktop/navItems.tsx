import React from 'react';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { StyledMenuItemsDesktop } from '../styles';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  hasMenuItem: number;
  clickHandler: (title: string) => void;
}> = ({ options, data, hasMenuItem, clickHandler }) => {
  const { handleSelect, isSelected } = options;

  const handleClick = (slug: string, title: string) => {
    handleSelect(slug);
    clickHandler(title);
  };

  return (
    <>
      {data.slice(0, hasMenuItem).map(({ title, slug, url }) => (
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
        >
          {title}
        </StyledMenuItemsDesktop>
      ))}
    </>
  );
};
