import React from 'react';
import { useBreakpointKey } from 'newskit';
import { StyledBlock, StyledTextBlock, StyledButton } from './styles';
import { NewsKitChevronRigthIcon } from '../../../assets';

interface HeaderProps {
  title?: string;
  color?: string;
}
export const SliceHeader = ({ title, color }: HeaderProps) => {
  const breakpointKey = useBreakpointKey();

  const typographyPresets =
    breakpointKey === 'xl' || breakpointKey === 'lg'
      ? 'newPreset060'
      : 'newPreset070';

  const iconSize =
    breakpointKey === 'xl' || breakpointKey === 'lg'
      ? 48
      : breakpointKey === 'md'
        ? 32
        : 40;

  return (
    <StyledBlock>
      <StyledTextBlock typographyPreset={typographyPresets} color={color}>
        {title}
      </StyledTextBlock>
      <StyledButton>
        <NewsKitChevronRigthIcon
          height={iconSize}
          width={iconSize}
          data-testid="icon"
          color={color}
          href="#"
        />
      </StyledButton>
    </StyledBlock>
  );
};
