import React, { useState, useEffect } from 'react';
import { DelayedComponent } from '../delayed-component/delayed-component';
import { UpdateButton } from './update-button';

type UpdateWithDelayProps = {
  loading: boolean;
  display: boolean;
  delay: number;
  label: string;
  handleClick: () => void;
  arrowUp: boolean;
  updatedTime: string;
};

export const UpdateButtonWithDelay = ({
  loading,
  delay,
  display,
  label,
  handleClick,
  arrowUp,
  updatedTime
}: UpdateWithDelayProps) => {
  console.log(updatedTime, 'UPDATED TIME')
  const getUpdatedTime = () => {
    console.log('HI');
    return ('2024-07-13T14:00:00.000Z')
    }

  const [hasUpdate, setUpdate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getUpdatedTime() > updatedTime &&
      setUpdate(true)
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
    {hasUpdate ? (
      <DelayedComponent delay={delay} initialState={display}>
      <UpdateButton
        loading={loading}
        label={label}
        handleClick={handleClick}
        arrowUp={arrowUp}
      />
    </DelayedComponent>
    ) : null}
    </>
  );
};
