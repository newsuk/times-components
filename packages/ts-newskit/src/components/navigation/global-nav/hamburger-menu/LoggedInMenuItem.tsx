// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { Button } from 'newskit';

const LoggedInMenuItem: React.FC<{
  title: string;
  selected: string;
  setSelected: (title: string) => void;
  clickHandler: (title: string) => void;
}> = ({ title, setSelected, selected, clickHandler }) => {
  const isSelected = selected === title ? true : false;

  return (
    <Button
      overrides={{
        width: '100%',
        typographyPreset: 'newPreset040',
        stylePreset: `${
          isSelected ? 'loggedInMenuItemActive' : 'loggedInMenuItem'
        }`
      }}
      onClick={() => {
        setSelected(title);
        clickHandler(title);
      }}
    >
      {title}
    </Button>
  );
};

export default LoggedInMenuItem;
