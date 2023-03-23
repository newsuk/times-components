import {
  Block,
  Image,
  styled,
  TextBlock,
  getMediaQueryFromTheme
} from 'newskit';

export const JournalistImageContainer = styled(Block)`
  width: 77px;
`;
export const JournalistImage = styled(Image)`
  border-radius: 50%;
`;

export const JournalistName = styled(TextBlock)<{ $color: string }>`
  color: ${({ $color }) => $color};
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
