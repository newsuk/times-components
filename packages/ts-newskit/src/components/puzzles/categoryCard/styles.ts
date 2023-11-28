import {
  styled,
  getMediaQueryFromTheme,
  Stack,
  getColorCssFromTheme,
} from 'newskit';

export const StyledIconWrapper = styled(Stack)`
  ${getColorCssFromTheme('background-color', 'sectionBrand010')};
  .puzzle-icon {
    height: auto;
    width: 75px;
    ${getMediaQueryFromTheme('md')} {
      width: 60px;
    }
    ${getMediaQueryFromTheme('lg')} {
      width: 75px;
    }
    ${getMediaQueryFromTheme('xl')} {
      width: 75px;
    }
  }
`;
