import React from 'react';
import { FilledArrowIcon } from '@times-components/ts-newskit/src/assets';
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
