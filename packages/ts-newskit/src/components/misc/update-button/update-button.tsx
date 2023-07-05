import React from 'react';
import { Button } from 'newskit';
import { NewsKitFilledArrowIcon } from '../../../assets';
import { DelayedComponent } from '../delayed-component/delayed-component';

export const UpdateButton: React.FC<{ loading: boolean, display: boolean, delay: number, label: string, handleClick: any }> = ({ loading, display, delay, label, handleClick }) => {
  return (
    <DelayedComponent delay={delay} initialState={display}>
      <Button size='medium' loading={loading}
      overrides={{ stylePreset: 'pillButton', height: 'sizing060', width: loading ? 'sizing060' : 'fit-content'}} onClick={() => handleClick()}>
      <NewsKitFilledArrowIcon />
        {label}
    </Button>
    </DelayedComponent>
  )};