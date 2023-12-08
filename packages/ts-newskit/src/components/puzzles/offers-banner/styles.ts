import {
  Button,
  Block,
  styled,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  TextBlock,
  getColorCssFromTheme
} from 'newskit';

export const Container = styled(Block)`
  width: 100%;
  position: relative;
  ${getMediaQueryFromTheme('xs')} {
    ${getSpacingCssFromTheme('padding', 'space045')};
  }

  ${getMediaQueryFromTheme('md')} {
    ${getSpacingCssFromTheme('padding', 'space070')};
  }
`;

export const Title = styled(TextBlock)`
  text-align: center;
`;

export const Subtitle = styled(TextBlock)`
  text-align: center;
`;

export const ViewOffersButton = styled(Button)`
  ${getColorCssFromTheme('backroundColor', 'inkInformative')};
  color: white;
  margin: 0 auto;
  width: 200px;
  text-align: center;
  display: flex;
`;

export const Background = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
