import React from 'react';
import { Stack } from 'newskit';
import { StyledGrid } from '../shared-styles';

export const CustomGridLayout: React.FC = ({ children }) => {
  return (
    <StyledGrid xsMargin="space010" mdMargin="space020" lgMargin="space030">
      {children}
    </StyledGrid>
  );
};

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
