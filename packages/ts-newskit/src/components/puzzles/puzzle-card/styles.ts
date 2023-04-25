import {
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  Image,
  Card
} from 'newskit';

export const StyledImage = styled(Image)`
  border-radius: 3px 3px 0 0;
`;

export const StyledCardComposable = styled(Card)`
  text-align: center;
  border: 1px solid;
  border-radius: 4px;
  ${getColorCssFromTheme('borderColor', 'interface040')};
  ${getColorCssFromTheme('backgroundColor', 'transparent')};
  height: 211.33px;
  ${getMediaQueryFromTheme('xs')} {
    height: 168px;
  }
  ${getMediaQueryFromTheme('sm')} {
    height: 201.33px;
  }
  ${getMediaQueryFromTheme('md')} {
    height: 186.67px;
  }
  ${getMediaQueryFromTheme('lg')} {
    height: 211.33px;
  }
  ${getMediaQueryFromTheme('xl')} {
    height: 261.33px;
  }
`;
