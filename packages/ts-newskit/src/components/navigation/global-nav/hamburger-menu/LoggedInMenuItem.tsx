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
