import { styled, TextBlock, Block, getSizingCssFromTheme } from 'newskit';

export const ColouredText = styled(TextBlock)<{ $color?: string }>`
  ${({ $color }) => $color && `color: ${$color};`};
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;
