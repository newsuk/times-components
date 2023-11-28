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
  UnorderedList,
} from 'newskit';
import {
  NewsKitHeroBannerKillerSudoku,
  NewsKitHeroBannerQuintagram,
  NewsKitHeroBannerSuko,
  NewsKitHeroBannerWordPuzzle,
} from '../../../assets';

export const SyledUnorderedList = styled(UnorderedList)`
  & a {
    color: inherit;
    font-weight: 600;
  }

  & p {
    margin-bottom: 0px;
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
    text-decoration: underline;
  }

  ${getMediaQueryFromTheme('xs', 'md')} {
    align-self: center;
  }

  ${getMediaQueryFromTheme('xs')} {
    text-align: center;
    width: 100%;
  }

  ${getMediaQueryFromTheme('md')} {
    width: unset;
  }
`;

export const HeroBannerContainer = styled(Stack)<StackProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${getColorCssFromTheme('backgroundColor', 'sectionBrand040')};
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  ${getColorCssFromTheme('backgroundColor', 'sectionBrand040')};
`;

export const StyledHeroIconContainer = styled(Block)`
  position: relative;

  ${getMediaQueryFromTheme('md')} {
    margin: 0 auto;
  }

  ${getMediaQueryFromTheme('lg')} {
    margin-right: 12px;
  }
`;

export const MainIconContainer = styled(Block)`
  position: relative;
  z-index: 2;
  top: 0;

  ${getMediaQueryFromTheme('xs', 'md')} {
    display: none;
  }

  ${getMediaQueryFromTheme('md')} {
    & .iconType {
      width: 180px;
      height: 180px;
    }
  }

  ${getMediaQueryFromTheme('md', 'lg')} {
    display: block;
    position: relative;
    ${getSpacingCssFromTheme('marginInlineStart', 'space010')};
  }

  @media (min-width: 1200px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    & .iconType {
      width: 197px;
      height: unset;
    }
  }
`;

export const StyledIconWrapper = styled(Block)`
  position: relative;
  display: none;

  ${getMediaQueryFromTheme('lg')} {
    & .iconBg {
      width: 550px;
    }
  }

  @media (min-width: 1200px) {
    display: block;

    & .iconBg {
      width: 550px;
    }
  }
`;

export const StyledHeroBannerKillerSudoku = styled(
  NewsKitHeroBannerKillerSudoku,
)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    left: 19%;
    top: 29.6%;
    width: 43px;
    height: 54px;
  }

  @media (min-width: 1200px) {
    left: 20%;
    top: 18%;
    width: 68px;
    height: 92px;
  }
`;

export const StyledHeroBannerQuintagram = styled(NewsKitHeroBannerQuintagram)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    right: 22.4%;
    bottom: 25.3%;
    width: 49px;
    height: 49px;
  }

  @media (min-width: 1200px) {
    right: 25.1%;
    bottom: 11.3%;
    width: 82px;
    height: 82px;
  }
`;

export const StyledHeroBannerSuko = styled(NewsKitHeroBannerSuko)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    top: 24.6%;
    right: 22%;
    width: 49px;
    height: 49px;
  }

  @media (min-width: 1200px) {
    top: 9.6%;
    right: 24%;
    width: 82px;
    height: 82px;
  }
`;

export const StyledHeroBannerWordPuzzle = styled(NewsKitHeroBannerWordPuzzle)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    left: 17%;
    bottom: 25%;
    width: 49px;
    height: 49px;
  }

  ${getMediaQueryFromTheme('lg')} {
    left: 21%;
    bottom: 11%;
    width: 82px;
    height: 82px;
  }

  @media (min-width: 1200px) {
    left: 21%;
    bottom: 11%;
    width: 82px;
    height: 82px;
  }
`;

export const StyledBlock = styled(Block)`
  margin: 0 auto;
  position: relative;
  max-width: 1290px;
  width: 100%;
`;

export const StyledSpan = styled(TextBlock)`
  ${getMediaQueryFromTheme('xs')} {
    display: block;
  }
  ${getMediaQueryFromTheme('md')} {
    display: inline-block;
  }
`;
