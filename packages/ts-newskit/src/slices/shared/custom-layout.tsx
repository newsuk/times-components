import React from 'react';
import { BlockItem } from '../shared-styles';

interface CustomBlockLayoutProps {
  children?: React.ReactNode;
}

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
