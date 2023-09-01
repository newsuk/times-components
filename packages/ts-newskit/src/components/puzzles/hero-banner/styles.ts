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
  ${getMediaQueryFromTheme('md')} {
    ${getSpacingCssFromTheme('paddingBlockStart', 'space100')};
    ${getSpacingCssFromTheme('paddingInline', 'space090')};
  }
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
`;

export const StyledHeroIconContainer = styled(Block)`
  position: relative;
`;

export const MainIconContainer = styled(Block)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  ${getMediaQueryFromTheme('xs', 'md')} {
    display: none;
  }

  ${getMediaQueryFromTheme('md', 'lg')} {
    display: block;
    position: relative;
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
  left: 18.5%;
  top: 17.5%;
`;

export const StyledHeroBannerQuintagram = styled(NewsKitHeroBannerQuintagram)`
  position: absolute;
  right: 22.5%;
  bottom: 11.5%;
`;

export const StyledHeroBannerSuko = styled(NewsKitHeroBannerSuko)`
  position: absolute;
  top: 10%;
  right: 22%;
`;

export const StyledHeroBannerWordPuzzle = styled(NewsKitHeroBannerWordPuzzle)`
  position: absolute;
  left: 18%;
  bottom: 13%;
}
`;
