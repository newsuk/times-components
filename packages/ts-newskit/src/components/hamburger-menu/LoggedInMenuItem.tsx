import React from 'react';
import { Button, TextBlock } from 'newskit';
import styled from 'styled-components';

const StyledButton = styled(Button)<{ isSelected: boolean }>`
  border-bottom: ${({ isSelected }) => (isSelected ? '2px solid #FFFFFF !important' : '2px solid #C2C2C2 !important')};
  width: 100%;
  font-family: Roboto-Regular;
`;

const StyledTextBlock = styled(TextBlock)<{ isSelected: boolean}>`
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#C2C2C2')};
  font-size: 15px;
`;

const LoggedInMenuItem: React.FC<{ title: string, handleClick: Function, selected: string}> = ({ title, handleClick, selected }) => {
  const isSelected = selected === title ? true : false; 
  return (
  <StyledButton isSelected={isSelected} overrides={{ stylePreset: 'menuState' }} onClick={() => handleClick(title)}>
    <StyledTextBlock isSelected={isSelected}>{title}</StyledTextBlock>
  </StyledButton>
)};

export default LoggedInMenuItem;