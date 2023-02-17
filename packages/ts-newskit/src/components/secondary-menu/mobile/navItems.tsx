import React from 'react';
import { MenuItem, Block } from 'newskit';
import { MenuDivider } from '../styles';
import { SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  data: SecondaryMenuItem[];
  handleSelect: (title: string) => void;
}> = ({ data, handleSelect }) => {
  const menuItemsPreset = {
    stylePreset: 'secondaryMenuItem'
  };

  return (
    <>
      {data.map(item => (
        <Block stylePreset="blockDefault">
          <MenuItem
            overrides={{ ...menuItemsPreset, typographyPreset: 'newPreset020' }}
            href={item.url}
            id={`vertical-${item.slug}`}
            key={item.slug}
            onClick={() => handleSelect(item.title)}
          >
            {item.title}
          </MenuItem>
          <MenuDivider />
        </Block>
      ))}
    </>
  );
};
