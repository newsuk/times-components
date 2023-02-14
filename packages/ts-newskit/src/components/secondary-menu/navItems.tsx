import React from 'react';
import { MenuItem } from 'newskit';
import { MenuDivider, MenuItems, MenuItemsWrapper } from './styles';
import { SecondaryMenuItem } from './types';

export const NavItems: React.FC<{
  data: SecondaryMenuItem[];
}> = ({ data }) => {
  return (
    <MenuItemsWrapper>
      {data.map(item => (
        <MenuItems>
          <MenuItem
            overrides={{ stylePreset: 'menuItemMobile' }}
            href={item.url}
            id={`vertical-${item.slug}`}
            key={item.slug}
          >
            {item.title}
          </MenuItem>
          <MenuDivider />
        </MenuItems>
      ))}
    </MenuItemsWrapper>
  );
};
