import React from 'react';
import FilledArrowIcon from './assets/FilledArrowIcon';
import { StyledButton } from './styles';

type UpdateButtonProps = {
  label: string;
  handleClick: () => void;
};

export const UpdateButton = ({ label, handleClick }: UpdateButtonProps) => {
  return (
    <StyledButton onClick={() => handleClick()}>
      <FilledArrowIcon data-testid="upward-arrow" />
      {label}
    </StyledButton>
  );
};
