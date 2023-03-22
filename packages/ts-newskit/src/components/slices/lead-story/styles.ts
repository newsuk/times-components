import { styled, TextBlock, Stack } from 'newskit';

export const StyledTextBlock = styled(TextBlock)`
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: scale(-1, -1);
`;

export const StyledTextStack = styled(Stack)`
  border-top: 1px dotted black;
`;

export const Styledinterviewee = styled(TextBlock)`
  color: ${({ color }) => color};
`;
