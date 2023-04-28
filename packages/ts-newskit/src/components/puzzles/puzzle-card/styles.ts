import {
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  getStylePresetFromTheme,
  Image,
  Card,
  Block
} from 'newskit';

export const StyledImage = styled(Image)`
  ${getMediaQueryFromTheme('xs')} {
    max-width: 126px;
    height: 84px;
  }
  ${getMediaQueryFromTheme('sm')} {
    max-width: 206px;
    height: 137.33px;
  }
  ${getMediaQueryFromTheme('md')} {
    max-width: 154px;
    height: 102.67px;
  }
  ${getMediaQueryFromTheme('lg')} {
    max-width: 218px;
    height: 145.33px;
  }
  ${getMediaQueryFromTheme('xl')} {
    max-width: 293px;
    height: 195.33px;
  }
`;

export const StyledCard = styled(Card)`
  ${getStylePresetFromTheme('puzzleCard')};
  ${getColorCssFromTheme('borderColor', 'interface040')};
  ${getColorCssFromTheme('backgroundColor', 'transparent')};
  ${getMediaQueryFromTheme('xs')} {
    min-height: 168px;
    width: 126px;
  }
  ${getMediaQueryFromTheme('sm')} {
    min-height: 201.33px;
    width: 206px;
  }
  ${getMediaQueryFromTheme('md')} {
    min-height: 186.67px;
    width: 154px;
  }
  ${getMediaQueryFromTheme('lg')} {
    min-height: 211.33px;
    width: 218px;
  }
  ${getMediaQueryFromTheme('xl')} {
    min-height: 261.33px;
    width: 293px;
  }
`;

export const Wrap = styled(Block)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
