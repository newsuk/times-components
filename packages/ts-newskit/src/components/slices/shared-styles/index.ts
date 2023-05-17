import {
  styled,
  Block,
  getSizingCssFromTheme,
  getColorCssFromTheme,
  CardLink,
  CardMedia,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  LinkInline
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

export const TextLink = styled(LinkInline)`
  text-decoration: none;

  &&:hover,
  &&:active {
    text-decoration: underline;
  }
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;

const setImageMargin = (space: string) => ({ marginInline: `-${space}` });
export const FullWidthCardMediaMob = styled(CardMedia)`
  ${getMediaQueryFromTheme('xs', 'md')} {
    ${getSpacingCssFromTheme(setImageMargin, 'space045')};
  }
`;
