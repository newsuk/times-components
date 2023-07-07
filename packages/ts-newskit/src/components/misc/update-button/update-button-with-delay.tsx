import React from 'react';
import { DelayedComponent } from '../delayed-component/delayed-component';
import { UpdateButton } from './update-button';

type UpdateWithDelayProps = {
  loading: boolean;
  display: boolean;
  delay: number;
  label: string;
  handleClick: () => void;
  arrowUp: boolean;
};

export const UpdateButtonWithDelay = ({
  loading,
  delay,
  display,
  label,
  handleClick,
  arrowUp
}: UpdateWithDelayProps) => {
  return (
    <DelayedComponent delay={delay} initialState={display}>
      <UpdateButton
        loading={loading}
        label={label}
        handleClick={handleClick}
        arrowUp={arrowUp}
      />
    </DelayedComponent>
  );
};
