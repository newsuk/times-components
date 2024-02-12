// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
