import React from 'react';
import { StyledButton, StyledTextBlock } from './styles';

const LoggedInMenuItem: React.FC<{
  title: string;
  handleClick: (title: string) => void;
  selected: string;
}> = ({ title, handleClick, selected }) => {
  const isSelected = selected === title ? true : false;
  return (
    <StyledButton
      isSelected={isSelected}
      overrides={{ stylePreset: 'menuState' }}
      onClick={() => handleClick(title)}
    >
      <StyledTextBlock isSelected={isSelected}>{title}</StyledTextBlock>
    </StyledButton>
  );
};

export default LoggedInMenuItem;
