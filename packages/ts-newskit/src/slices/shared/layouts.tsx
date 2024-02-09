// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { Stack, GridLayout } from 'newskit';
import { CustomGridLayoutProps, CustomStackLayoutProps } from '../types';

export const CustomStackLayout: React.FC<CustomStackLayoutProps> = ({
  children,
  marginBlockEnd,
  className
}) => {
  return (
    <Stack
      flow="horizontal-top"
      stackDistribution="center"
      wrap={{
        xs: 'wrap',
        sm: 'wrap',
        md: 'wrap',
        lg: 'nowrap',
        xl: 'nowrap'
      }}
      marginInline={{
        xs: 'space045',
        md: 'space000'
      }}
      marginBlockEnd={marginBlockEnd || 'space060'}
      // @ts-ignore
      className={className}
    >
      {children}
    </Stack>
  );
};

export const WrappedStackLayout: React.FC<CustomStackLayoutProps> = ({
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

export const CustomGridLayout: React.FC<CustomGridLayoutProps> = ({
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
