import React, { Fragment } from 'react';
import { MenuItem } from 'newskit';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { MenuDividerDropdown, VisibleCheckMenuContainer } from '../styles';

export const CreateMoreMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  const { handleSelect, isSelected, isExpanded, setIsExpanded } = options;

  return (
    <VisibleCheckMenuContainer data={data}>
      {data.map(({ title, url }) => (
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
              clickHandler(title);
            }}
            selected={isSelected === title}
          >
            {title}
          </MenuItem>
          <MenuDividerDropdown />
        </Fragment>
      ))}
    </VisibleCheckMenuContainer>
  );
};
