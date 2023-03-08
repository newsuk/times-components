import React from 'react';
import { Button } from 'newskit';

const LoggedInMenuItem: React.FC<{
  title: string;
  selected: string;
  handleClick: () => void;
}> = ({ title, handleClick, selected }) => {
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
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default LoggedInMenuItem;
