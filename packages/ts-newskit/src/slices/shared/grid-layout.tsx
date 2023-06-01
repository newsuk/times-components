import React from 'react';
import { StyledGrid } from '../shared-styles';

export const CustomGridLayout: React.FC = ({ children }) => {
  return (
    <StyledGrid xsMargin="space010" mdMargin="space020" lgMargin="space030">
      {children}
    </StyledGrid>
  );
};
