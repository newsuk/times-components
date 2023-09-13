import React from 'react';
import { Stack, GridLayout } from 'newskit';

interface CustomStackLayoutProps {
  marginBlockEnd?: string;
  children?: React.ReactNode;
}

interface CustomGridLayoutProp {
  children?: React.ReactNode;
}

export const CustomStackLayout: React.FC<CustomStackLayoutProps> = ({
  children,
  marginBlockEnd
}) => {
  return (
    <Stack
      flow="horizontal-top"
      stackDistribution="center"
      wrap="wrap"
      marginInline={{
        xs: 'space045',
        md: 'space000'
      }}
      marginBlockEnd={marginBlockEnd || 'space060'}
    >
      {children}
    </Stack>
  );
};

export const CustomGridLayout: React.FC<CustomGridLayoutProp> = ({
  children
}) => {
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
