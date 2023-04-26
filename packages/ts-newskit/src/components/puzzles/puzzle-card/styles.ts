import {
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  Image,
  Card
} from 'newskit';

export const StyledImage = styled(Image)`
  border-radius: 3px 3px 0 0;
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
  text-align: center;
  border: 1px solid;
  border-radius: 4px;
  ${getColorCssFromTheme('borderColor', 'interface040')};
  ${getColorCssFromTheme('backgroundColor', 'transparent')};
  height: 211.33px;
  ${getMediaQueryFromTheme('xs')} {
    height: 168px;
    width: 126px;
  }
  ${getMediaQueryFromTheme('sm')} {
    height: 201.33px;
    width: 206px;
  }
  ${getMediaQueryFromTheme('md')} {
    height: 186.67px;
    width: 154px;
  }
  ${getMediaQueryFromTheme('lg')} {
    height: 211.33px;
    width: 218px;
  }
  ${getMediaQueryFromTheme('xl')} {
    height: 261.33px;
    width: 293px;
  }
`;

export const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
