import React from 'react';
import { Button } from 'newskit';
import { NewsKitFilledArrowIcon } from '../../../assets';
import { DelayedComponent } from '../delayed-exit/delayed-component';

const onClick = () => location.reload();

export const UpdateButton: React.FC<{ loading: boolean, display: boolean, delay: number }> = ({ loading, display, delay }) => {
  return (
    <DelayedComponent delay={delay} initialState={display}>
      <Button size='medium' loading={loading}
      overrides={{ stylePreset: 'pillButton', height: 'sizing060', width: loading ? 'sizing060' : 'fit-content'}} onClick={() => onClick()}>
      <NewsKitFilledArrowIcon />
        New Updates
    </Button>
    </DelayedComponent>
  )};