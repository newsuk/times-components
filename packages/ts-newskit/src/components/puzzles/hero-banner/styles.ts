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
`;

export const MainIconContainer = styled(Block)`
  position: absolute;
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
  ${getMediaQueryFromTheme('lg')} {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    & .iconType {
      width: 150px;
      height: unset;
    }
  }
  ${getMediaQueryFromTheme('xl')} {
    & .iconType {
      width: 200px;
    }
  }
`;

export const StyledIconWrapper = styled(Block)`
  position: relative;
  ${getMediaQueryFromTheme('xs', 'lg')} {
    display: none;
  }
  ${getMediaQueryFromTheme('lg')} {
    & .iconBg {
      width: 400px;
    }
  }
  ${getMediaQueryFromTheme('xl')} {
    & .iconBg {
      width: 493px;
    }
  }
`;

export const StyledHeroBannerKillerSudoku = styled(
  NewsKitHeroBannerKillerSudoku
)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    left: 17%;
    top: 24.5%;
  }
  ${getMediaQueryFromTheme('xl')} {
    left: 18.5%;
    top: 17.5%;
  }
`;

export const StyledHeroBannerQuintagram = styled(NewsKitHeroBannerQuintagram)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    right: 22.2%;
    bottom: 19%;
  }
  ${getMediaQueryFromTheme('xl')} {
    right: 22.5%;
    bottom: 12%;
  }
`;

export const StyledHeroBannerSuko = styled(NewsKitHeroBannerSuko)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    top: 17%;
    right: 21%;
  }
  ${getMediaQueryFromTheme('xl')} {
    top: 10%;
    right: 22%;
  }
`;

export const StyledHeroBannerWordPuzzle = styled(NewsKitHeroBannerWordPuzzle)`
  position: absolute;
  ${getMediaQueryFromTheme('lg')} {
    left: 16%;
    bottom: 20%;
  }
  ${getMediaQueryFromTheme('xl')} {
    left: 18%;
    bottom: 13%;
  }
}
`;

export const StyledBlock = styled(Block)`
  margin: 0 auto;
  position: relative;
  max-width: 1290px;
  width: 100%;
`;
