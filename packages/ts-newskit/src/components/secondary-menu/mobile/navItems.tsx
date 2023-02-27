import React from 'react';
import { MenuItem, Block } from 'newskit';
import { MenuDivider } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { handleSelect } = options;
  const menuItemsPreset = {
    stylePreset: 'secondaryMenuItem'
  };

  return (
    <>
      {data.map(item => (
        <Block stylePreset="blockDefault" key={item.slug}>
          <MenuItem
            overrides={{ ...menuItemsPreset, typographyPreset: 'newPreset020' }}
            href={item.url}
            id={`vertical-${item.slug}`}
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
