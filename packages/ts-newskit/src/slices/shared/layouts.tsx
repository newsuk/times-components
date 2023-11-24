import React from 'react';
import { Stack, GridLayout } from 'newskit';
import { BlockItem } from '../shared-styles';
export interface CustomStackLayoutProps {
  marginBlockEnd?: string;
  className?: string;
}
interface CustomGridLayoutProps {
  children?: React.ReactNode;
}

interface CustomBlockLayoutProps {
  children?: React.ReactNode;
}

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

export const CustomBlockLayout: React.FC<CustomBlockLayoutProps> = ({
  children
}) => {
  return (
    <BlockItem
      $width={{
        xs: '100%',
        md: '720px',
        lg: '976px',
        xl: '1276px'
      }}
      marginBlockEnd="space060"
    >
      {children}
    </BlockItem>
  );
};
