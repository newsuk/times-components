import React, { FC } from 'react';
import { Flag } from 'newskit';

interface FlagProps {
  status: 'COMPLETE' | 'IN PROGRESS' | string;
}

const FlagStatuses = new Map([
  ['COMPLETE', { stylePreset: 'flagComplete' }],
  ['IN PROGRESS', { stylePreset: 'flagProgress' }]
]);

export const PuzzlesFlag: FC<FlagProps> = ({ status }) => {
  return (
    <Flag
      size="small"
      overrides={{
        minWidth: '92px',
        stylePreset: `${FlagStatuses.get(status)!.stylePreset}`
      }}
    >
      {status}
    </Flag>
  );
};
