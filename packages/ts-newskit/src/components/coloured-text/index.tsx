import { styled, getColorCssFromTheme, TextBlock } from 'newskit';

export const ColouredText = styled(TextBlock)<{ $color?: string }>`
  ${({ $color }) => $color && getColorCssFromTheme('color', $color)};
`;
