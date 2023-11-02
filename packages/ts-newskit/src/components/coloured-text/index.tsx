import {
  styled,
  getColorCssFromTheme,
  TextBlock,
  getMediaQueryFromTheme
} from 'newskit';

export const ColouredText = styled(TextBlock)<{
  $color?: string;
  isCommentBucket1?: boolean;
}>`
  ${({ $color }) => $color && getColorCssFromTheme('color', $color)};

  ${getMediaQueryFromTheme('md', 'lg')} {
    ${({ isCommentBucket1 }) => isCommentBucket1 && 'text-align: center'};
  }
`;
