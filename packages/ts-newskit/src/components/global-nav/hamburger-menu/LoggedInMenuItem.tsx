import React from 'react';
import { TextBlock, Button } from 'newskit';

const LoggedInMenuItem: React.FC<{
  title: string;
  selected: string;
  handleClick: (title: string) => void;
}> = ({ title, handleClick, selected }) => {
  const isSelected = selected === title ? true : false;
  return (
    <Button
      overrides={{
        stylePreset: `${
          isSelected ? 'loggedInMenuItemActive' : 'loggedInMenuItem'
        }`
      }}
      onClick={() => handleClick(title)}
    >
      <TextBlock>{title}</TextBlock>
    </Button>
  );
};

export default LoggedInMenuItem;
