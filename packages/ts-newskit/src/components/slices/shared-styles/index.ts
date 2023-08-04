import {
  styled,
  Block,
  getSizingCssFromTheme,
  getColorCssFromTheme,
  CardLink,
  CardMedia,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  LinkInline,
  Hidden
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
    text-underline-position: under;
  }
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;

const setFullWidthMargin = (space: string) => ({ marginInline: `-${space}` });
export const FullWidthCardMediaMob = styled(CardMedia)`
  ${getMediaQueryFromTheme('xs', 'md')} {
    ${getSpacingCssFromTheme(setFullWidthMargin, 'space045')};
  }
`;

export const FullWidthHidden = styled(Hidden)`
  width: 100%;
`;
export const FullWidthBlock = styled(Block)`
  width: 100%;
  ${getMediaQueryFromTheme('xs', 'md')} {
    width: 100vw;
    ${getSpacingCssFromTheme(setFullWidthMargin, 'space045')};
  }
`;
const setInlinePaddingStart = (space: string) => ({
  paddingInlineStart: `${space}`
});
export const StyledSpan = styled.span<{ hasCaption: boolean }>`
  font-style: italic;
  ${({ hasCaption }) =>
    hasCaption
      ? getSpacingCssFromTheme(setInlinePaddingStart, 'space010')
      : getSpacingCssFromTheme(setInlinePaddingStart, 'space000')};
  font-weight: 300;
  font-size: 1.2rem;
`;
