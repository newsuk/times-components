import React from 'react';
import { StyledStack, StyledTextBlock, StyledButton } from './styles';
import { NewsKitChevronRightIcon } from '../../../assets';

export interface SliceHeaderProps {
  title: string;
  color: string;
}

export const SliceHeader = ({ title, color }: SliceHeaderProps) => {
  return (
    <StyledStack flow="horizontal-center" stackDistribution="space-between">
      <StyledTextBlock
        typographyPreset={{
          xs: 'newPreset070',
          lg: 'newPreset060'
        }}
        $color={color}
      >
        {title}
      </StyledTextBlock>
      <StyledButton>
        <NewsKitChevronRightIcon
          overrides={{
            size: {
              xs: '40px',
              md: '32px',
              lg: '48px'
            }
          }}
          color={color}
          data-testid="icon"
          href="#"
        />
      </StyledButton>
    </StyledStack>
  );
};
