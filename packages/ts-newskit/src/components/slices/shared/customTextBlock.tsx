import React, { ReactNode } from 'react';
import { TextBlock } from 'newskit';
import { Wrapper } from '../shared-styles';

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
    <TextBlock
      typographyPreset="customArticleTileInfoPreset"
      stylePreset={stylePreset ? stylePreset : 'inkBrand010'}
      as="span"
    >
      <Wrapper>
        {icon}
        {text}
      </Wrapper>
    </TextBlock>
  );
};
