import React from 'react';
import { MenuItem, Block } from 'newskit';
import { MenuDividerMobile, NavItemsContainer } from '../styles';
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
    <NavItemsContainer>
      {data.map(item => (
        <Block stylePreset="blockDefault" key={item.slug}>
          <MenuItem
            overrides={{
              ...menuItemsPreset,
              typographyPreset: 'newPreset020'
            }}
            href={item.url}
            id={`vertical-${item.slug}`}
            onClick={() => handleSelect(item.title)}
          >
            {item.title}
          </MenuItem>
          <MenuDividerMobile />
        </Block>
      ))}
    </NavItemsContainer>
  );
};
