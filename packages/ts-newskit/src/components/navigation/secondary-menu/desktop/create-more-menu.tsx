// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { SecondaryMenuOptions, ResponsiveSecondaryMenuItem } from '../types';
import { MenuDividerDropdown, StyledMenuItemsDropdown } from '../styles';

export const CreateMoreMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: ResponsiveSecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  const { handleSelect, isSelected, isExpanded, setIsExpanded } = options;

  return (
    <>
      {data.map(({ title, url, md, lg, xl }) => (
        <div key={title}>
          <StyledMenuItemsDropdown
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
            $showMD={md}
            $showLG={lg}
            $showXL={xl}
          >
            {title}
          </StyledMenuItemsDropdown>
          <MenuDividerDropdown />
        </div>
      ))}
    </>
  );
};
