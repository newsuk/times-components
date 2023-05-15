import {
  styled,
  TextBlock,
  Block,
  getSizingCssFromTheme,
  getColorCssFromTheme,
  CardLink,
  CardMedia,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  IconButton
} from 'newskit';

export const CardHeadlineLink = styled(CardLink)<{ $color?: string }>`
  ${({ $color }) => getColorCssFromTheme('color', $color || 'inkContrast')};
  cursor: pointer;
  text-decoration: none;

  &&:hover,
  &&:active {
    text-decoration: none;
    ${getColorCssFromTheme('color', 'interactiveLink020')};
  }

  &&:active {
    ${getColorCssFromTheme('color', 'interactiveLink030')};
  }
`;

export const ColouredText = styled(TextBlock)<{ $color?: string }>`
  ${({ $color }) => $color && getColorCssFromTheme('color', $color)};
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;

export const TransparentButton = styled(IconButton)`
  &,
  &:hover:not(:disabled) {
    background-color: transparent;
  }
`;

const setImageMargin = (space: string) => ({ marginInline: `-${space}` });
export const FullWidthCardMediaMob = styled(CardMedia)`
  ${getMediaQueryFromTheme('xs', 'md')} {
    ${getSpacingCssFromTheme(setImageMargin, 'space045')};
  }
`;
