import React from 'react';
import { Button } from 'newskit';
import { NewsKitFilledArrowIcon } from '../../../assets';

export const UpdateButton: React.FC<{ loading: boolean, onClick: any }> = ({ loading }) => (
    <Button size='medium' loading={loading}
      overrides={{ stylePreset: 'pillButton', height: 'sizing060', width: loading ? 'sizing060' : 'fit-content'}} onClick={() => onClick()}>
      <NewsKitFilledArrowIcon />
        New Updates
    </Button>
  );