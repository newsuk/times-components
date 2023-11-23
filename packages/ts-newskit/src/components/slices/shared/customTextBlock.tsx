import React, { ReactNode } from 'react';
import { TextBlock, styled } from 'newskit';

const StyledTextBlock = styled(TextBlock)`
  display: inline;

  ::before,
  ::after {
    display: inline-block;
  }
`;

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
    <StyledTextBlock
      typographyPreset="utilityLabel005"
      stylePreset={stylePreset ? stylePreset : 'inkBrand010'}
      as="span"
    >
      {icon}
      {text}
    </StyledTextBlock>
  );
};
