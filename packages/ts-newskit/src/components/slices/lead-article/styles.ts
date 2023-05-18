import {
  styled,
  TextBlock,
  Stack,
  Divider,
  getMediaQueryFromTheme
} from 'newskit';

export const StyledTextBlock = styled(TextBlock)`
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: scale(-1, -1);
`;

export const StyledTextStack = styled(Stack)`
  border-top: 1px dashed black;
`;

export const StyledDivider = styled(Divider)`
  display: none;
  ${getMediaQueryFromTheme('md')} {
    display: inline;
  }
`;
