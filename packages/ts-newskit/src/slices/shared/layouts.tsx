import React from 'react';
import { Stack } from 'newskit';

export const CustomStackLayout: React.FC = ({ children }) => {
  return (
    <Stack
      flow="horizontal-top"
      stackDistribution="center"
      wrap="wrap"
      marginInline={{
        xs: 'space045',
        md: 'space000'
      }}
    >
      {children}
    </Stack>
  );
};
