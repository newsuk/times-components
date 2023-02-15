import React from 'react';
import { StyledButton } from './styles';
import { TextBlock } from 'newskit';

const LoggedInMenuItem: React.FC<{
  title: string;
  handleClick: (title: string) => void;
  selected: string;
}> = ({ title, handleClick, selected }) => {
  const isSelected = selected === title ? true : false;
  return (
    <StyledButton isSelected={isSelected} onClick={() => handleClick(title)}>
      <TextBlock>{title}</TextBlock>
    </StyledButton>
  );
};

export default LoggedInMenuItem;
