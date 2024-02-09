// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { ReactNode } from 'react';
import { InlineTextBlock } from '../shared-styles';

export const CustomTextBlock = ({
  text,
  stylePreset,
  icon
}: {
  text?: string;
  stylePreset?: string;
  icon?: ReactNode;
}) => {
  return (
    <InlineTextBlock
      typographyPreset="utilityLabel005"
      stylePreset={stylePreset ? stylePreset : 'inkBrand010'}
      as="span"
    >
      {icon}
      {text}
    </InlineTextBlock>
  );
};
