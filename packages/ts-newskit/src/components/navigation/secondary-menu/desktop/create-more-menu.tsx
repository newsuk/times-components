import React, { Fragment } from 'react';
import { MenuItem } from 'newskit';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { MenuDividerDropdown } from '../styles';

export const CreateMoreMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  moreMenuItemsLength: number;
  clickHandler: (title: string) => void;
}> = ({ options, data, moreMenuItemsLength, clickHandler }) => {
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
              clickHandler(title)
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
