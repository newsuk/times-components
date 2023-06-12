import {
  Stack,
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  StackProps,
  Block
} from 'newskit';
import IconD2 from '../../../assets/IconD2';
import IconA4 from '../../../assets/IconA4';

export const FreeTrialContainer = styled(Stack)<StackProps>`
  overflow: hidden;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
  ${getMediaQueryFromTheme('xs')} {
    text-align: center;
  }
  ${getMediaQueryFromTheme('md')} {
    text-align: left;
  }
`;

export const StyledBlock = styled(Block)`
  position: relative;
  ${getMediaQueryFromTheme('md')} {
    max-width: 604px;
  }
  ${getMediaQueryFromTheme('lg')} {
    max-width: 838px;
  }
  ${getMediaQueryFromTheme('xl')} {
    max-width: 1058px;
  }
`;

export const StyledWrapper = styled(Block)`
  ${getMediaQueryFromTheme('lg')} {
    padding-right: 270px;
  }
`;

export const StyledIconD2 = styled(IconD2)`
  position: absolute;
  ${getMediaQueryFromTheme('xs')} {
    right: 88.02%;
    top: -38%;
    width: 62.64px;
    height: 62.64px;
  }
  ${getMediaQueryFromTheme('sm')} {
    right: 87.02%;
    top: -57%;
    width: 55.96px;
    height: 55.96px;
  }
  ${getMediaQueryFromTheme('md')} {
    right: 91.02%;
    top: -47%;
  }
  ${getMediaQueryFromTheme('lg')} {
    top: -30px;
    right: 150px;
    width: 75.34px;
    height: 75.34px;
  }
  ${getMediaQueryFromTheme('xl')} {
    top: -30px;
    right: 190px;
    width: 82.99px;
    height: 82.99px;
  }
`;

export const StyledIconA4 = styled(IconA4)`
  position: absolute;
  ${getMediaQueryFromTheme('xs')} {
    right: -14%;
    bottom: -32.5%;
    width: 69.1px;
    height: 69.1px;
  }
  ${getMediaQueryFromTheme('sm')} {
    right: 0%;
    bottom: -49.5%;
    width: 64.47px;
    height: 64.47px;
  }
  ${getMediaQueryFromTheme('md')} {
    right: 0%;
    bottom: -41.5%;
    width: 90.2px;
    height: 90.2px;
  }
  ${getMediaQueryFromTheme('lg')} {
    right: 54px;
    bottom: -20px;
    width: 113.58px;
    height: 113.58px;
  }
  ${getMediaQueryFromTheme('xl')} {
    right: 80px;
    bottom: -20px;
    width: 125.1px;
    height: 125.1px;
  }
`;
