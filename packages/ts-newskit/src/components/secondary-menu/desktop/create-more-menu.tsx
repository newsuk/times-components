import React, { Fragment } from 'react';
import { MenuItem } from 'newskit';
import { MenuDividerDropdown } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

export const CreateMoreMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  moreMenuItemsLength: number;
}> = ({ options, data, moreMenuItemsLength }) => {
  const { handleSelect, isSelected, isExpanded, setIsExpanded } = options;

  return (
    <>
      {data.slice(-moreMenuItemsLength).map(({ title, url }) => (
        <Fragment key={title}>
          <MenuItem
            href={url}
            overrides={{
              stylePreset: 'menuItemMore',
              typographyPreset: 'newPreset050'
            }}
            onClick={() => {
              handleSelect(title);
              setIsExpanded(!isExpanded);
            }}
            selected={isSelected === title}
          >
            {title}
          </MenuItem>
          <MenuDividerDropdown />
        </Fragment>
      ))}
    </>
  );
};
