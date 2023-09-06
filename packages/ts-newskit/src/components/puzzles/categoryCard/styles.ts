import {
  styled,
  getMediaQueryFromTheme,
  Stack,
  getColorCssFromTheme
} from 'newskit';

export const StyledIconWrapper = styled(Stack)`
  ${getColorCssFromTheme('background-color', 'puzzles010')};
  .puzzle-icon {
    height: auto;
    width: 75px;
    ${getMediaQueryFromTheme('md')} {
      width: 65px;
    }
    ${getMediaQueryFromTheme('lg')} {
      width: 82px;
    }
    ${getMediaQueryFromTheme('xl')} {
      width: 120px;
    }
  }
`;
