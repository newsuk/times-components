import {
  styled,
  Block,
  getSizingCssFromTheme,
  getColorCssFromTheme,
  CardLink,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  LinkInline,
  Hidden,
  TextBlock,
  GridLayoutItem
} from 'newskit';
import TheTimesLight from '@newskit-themes/the-times/TheTimes-light.json';

const getRatio = (ratioString: string) => {
  const [ratioWidth, ratioHeight] = ratioString.split(':');

  return Number(ratioWidth) / Number(ratioHeight);
};

export const AdContainer = styled.div`
  display: flex;
  height: 250px;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${getColorCssFromTheme('background-color', 'interface020')};
`;

export const CardHeadlineLink = styled(CardLink)<{
  $color?: string;
  isCommentBucket1?: boolean;
}>`
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

  ${getMediaQueryFromTheme('md', 'lg')} {
    ${({ isCommentBucket1 }) => isCommentBucket1 && 'text-align: center'};
  }
`;

export const TextLink = styled(LinkInline)`
  text-decoration: none;
  ${getColorCssFromTheme('color', 'inkContrast')};
  &&:hover,
  &&:active {
    ${getColorCssFromTheme('color', 'interactiveLink020')};
  }
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
  :last-child {
    display: none;
  }
`;

const setFullWidthMargin = (space: string) => ({ marginInline: `-${space}` });

export const FullWidthGridLayoutItem = styled(GridLayoutItem)<{
  ratio?: string;
  className?: string;
}>`
  height: ${({ className }) =>
    className && className !== 'article-image' ? 0 : '100%'};
  overflow: hidden;
  position: relative;
  padding-bottom: ${({ ratio }) => (ratio ? `${100 / getRatio(ratio)}%;` : 0)};
  img: {
    opacity: 1,
    zIndex: 2,
    position: absolute,
    display: block
  }
  ${getMediaQueryFromTheme('xs', 'md')} {
    ${getSpacingCssFromTheme(setFullWidthMargin, 'space045')};
    padding-bottom: ${({ ratio }) =>
      ratio
        ? `calc(${100 / getRatio(ratio)}% + ${40 / getRatio(ratio)}px)`
        : 0};
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
  ${({ hasCaption }) =>
    hasCaption
      ? getSpacingCssFromTheme(setInlinePaddingStart, 'space010')
      : getSpacingCssFromTheme(setInlinePaddingStart, 'space000')};
  font-size: 1rem;
`;

export const StyledTextBlock = styled(TextBlock)`
  background-color: ${TheTimesLight.colors.interactiveNegative030};
  color: ${TheTimesLight.colors.interactiveInverse030};
  border-radius: 2px;
`;

export const InlineTextBlock = styled(TextBlock)`
  display: inline;

  ::before,
  ::after {
    display: inline-block;
  }
`;

export const VideoIconContainer = styled.span`
  vertical-align: baseline;
  line-height: 24px;
  :last-child > div {
    display: none;
  }
`;
