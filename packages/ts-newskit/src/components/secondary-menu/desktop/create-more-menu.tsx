import React, { Fragment } from 'react';
import { MenuItem } from 'newskit';
import { MenuDividerDesktop } from '../styles';
import { SecondaryMenuItem } from '../types';
import { useBreakpoint } from '../../utils/test';

export const CreateMoreMenu: React.FC<{
  data: SecondaryMenuItem[];
  isSelected: string;
  handleSelect: (value: string) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}> = ({ data, handleSelect, isSelected, isExpanded, setIsExpanded }) => {
  const { moreMenuLength } = useBreakpoint(data);

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
