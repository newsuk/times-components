import {
  Stack,
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  StackProps,
  Block,
  Divider,
  TextBlock,
  UnorderedList
} from 'newskit';
import {
  NewsKitCrosswordIcon,
  NewsKitHeroBannerBackground,
  NewsKitHeroBannerKillerSudoku,
  NewsKitHeroBannerQuintagram,
  NewsKitHeroBannerSuko,
  NewsKitHeroBannerWordPuzzle
} from '../../../assets';

export const SyledUnorderedList = styled(UnorderedList)`
  & a {
    color: inherit;
    font-weight: 600;
  }
`;

export const StyledDivider = styled(Divider)`
  border-style: dashed;
  border-color: black;
`;

export const StyledTextBlock = styled(TextBlock)`
  & a {
    color: inherit;
    font-weight: 600;
  }

  ${getMediaQueryFromTheme('xs', 'md')} {
    align-self: center;
  }
`;

export const HeroBannerContainer = styled(Stack)<StackProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
  ${getMediaQueryFromTheme('xs')} {
    ${getSpacingCssFromTheme('paddingBlockStart', 'space100')};
    ${getSpacingCssFromTheme('paddingInline', 'space050')};
  }
  ${getMediaQueryFromTheme('sm')} {
    ${getSpacingCssFromTheme('paddingBlockStart', 'space100')};
    ${getSpacingCssFromTheme('paddingInline', 'space090')};
  }
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
`;

export const StyledWrapper = styled(Block)`
  ${getMediaQueryFromTheme('lg')} {
    padding-right: 270px;
  }
`;

export const StyledHeroIconContainer = styled(Block)`
  position: relative;
`;

export const StyledHeroBackground = styled(NewsKitHeroBannerBackground)`
  transform: scale(1.1);
`;

export const StyledCrosswordIcon = styled(NewsKitCrosswordIcon)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50%, 30%);
  z-index: 2;

  ${getMediaQueryFromTheme('md', 'lg')} {
    position: relative;
    transform: translate(0%, 0%);
    ${getSpacingCssFromTheme('marginInlineStart', 'space010')};
  }
`;

export const StyledIconWrapper = styled(Block)`
  position: relative;
  ${getMediaQueryFromTheme('xs', 'lg')} {
    display: none;
  }
`;

export const StyledHeroBannerKillerSudoku = styled(
  NewsKitHeroBannerKillerSudoku
)`
  position: absolute;
  left: 13%;
  top: 16.5%;
`;

export const StyledHeroBannerQuintagram = styled(NewsKitHeroBannerQuintagram)`
  position: absolute;
  right: 20%;
  bottom: 1%;
`;

export const StyledHeroBannerSuko = styled(NewsKitHeroBannerSuko)`
  position: absolute;
  top: 10%;
  right: 19%;
`;

export const StyledHeroBannerWordPuzzle = styled(NewsKitHeroBannerWordPuzzle)`
  position: absolute;
  left: 13%;
  bottom: 3%;
}
`;
