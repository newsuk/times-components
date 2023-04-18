import { styled, TextBlock } from 'newskit';

export const ColouredText = styled(TextBlock)<{ $color?: string }>`
  ${({ $color }) => $color && `color: ${$color};`};
`;
