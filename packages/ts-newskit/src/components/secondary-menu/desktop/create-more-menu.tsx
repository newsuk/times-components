import React, { Fragment } from 'react';
import { MenuItem } from 'newskit';
import { MenuDividerDesktop } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const CreateMoreMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { handleSelect, isSelected, isExpanded, setIsExpanded } = options;
  const { moreMenuLength } = getBreakpoint(data);

  return (
    <>
      {data.slice(-moreMenuLength).map(({ title, url }) => (
        <Fragment>
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
          <MenuDividerDesktop />
        </Fragment>
      ))}
    </>
  );
};
