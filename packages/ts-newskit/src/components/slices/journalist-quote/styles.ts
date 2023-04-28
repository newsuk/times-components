import {
  Block,
  Image,
  styled,
  TextBlock,
  getMediaQueryFromTheme,
  Stack
} from 'newskit';

export const JournalistContainer = styled(Stack)`
  width: 100%;

  ${getMediaQueryFromTheme('md')} {
    width: 50%;
  }
`;
export const JournalistImageContainer = styled(Block)`
  width: 77px;
`;
export const JournalistImage = styled(Image)`
  border-radius: 50%;
`;

export const StyledTextBlock = styled(TextBlock)`
  display: inline;
  ${getMediaQueryFromTheme('sm')} {
    display: block;
  }

  &::before,
  &::after {
    display: inline;

    ${getMediaQueryFromTheme('sm')} {
      display: block;
    }
  }
`;

export const QuoteText = styled(StyledTextBlock)<{ $color?: string }>`
  ${({ $color }) => $color && `color: ${$color};`};
`;
