import React from 'react';
import { Stack, GridLayout } from 'newskit';

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
      marginBlockEnd="space060"
    >
      {children}
    </Stack>
  );
};

export const CustomGridLayout: React.FC = ({ children }) => {
  return (
    <GridLayout
      columns={'1fr 1px 1fr 1px 1fr 1px 1fr'}
      columnGap="space040"
      rowGap="space040"
      data-testid="article-container"
    >
      {children}
    </GridLayout>
  );
};
