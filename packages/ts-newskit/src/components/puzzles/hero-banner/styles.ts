import {
  Stack,
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  StackProps,
  Block,
  Divider,
  TextBlock,
  UnorderedList
} from 'newskit';
import IconD2 from '../../../assets/IconD2';
import IconA4 from '../../../assets/IconA4';
import CrosswordIcon from '../../../assets/CrosswordIcon';

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
`;

export const HeroBannerContainer = styled(Stack)<StackProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
  ${getMediaQueryFromTheme('xs')} {
    text-align: center;
  }
  ${getMediaQueryFromTheme('md')} {
    text-align: left;
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

export const StyledIconD2 = styled(IconD2)`
  position: absolute;
  width: 62.64px;
  height: 62.64px;
  top: -2%;
  right: 50%;
`;

export const StyledIconA4 = styled(IconA4)`
  position: absolute;
  right: 15%;
  bottom: -5%;
  width: 122px;
  height: 122px;
`;

export const StyledCrosswordIcon = styled(CrosswordIcon)``;
