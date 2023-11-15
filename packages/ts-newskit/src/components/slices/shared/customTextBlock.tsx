import React, { ReactNode } from 'react';
import { TextBlock } from 'newskit';
import { Wrapper } from '../shared-styles';

export const CustomTextBlock = ({
  text,
  stylePreset,
  icon,
  alignFlex = true
}: {
  text?: string;
  stylePreset?: string;
  icon?: ReactNode;
  alignFlex?: boolean;
}) => {
  return (
    <TextBlock
      typographyPreset="utilityLabel005"
      stylePreset={stylePreset ? stylePreset : 'inkBrand010'}
      as="span"
    >
      <Wrapper as="span" alignFlex={alignFlex}>
        {icon}
        {text}
      </Wrapper>
    </TextBlock>
  );
};
