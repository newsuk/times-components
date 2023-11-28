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
