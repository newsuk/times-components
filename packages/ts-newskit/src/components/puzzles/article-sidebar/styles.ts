import {
  CardComposable,
  getColorCssFromTheme,
  styled,
  CardMedia
} from 'newskit';

export const StyledCardComposable = styled(CardComposable)`
  &:hover {
    button {
      ${getColorCssFromTheme('backgroundColor', 'interface040')};
    }
  }
  h3 {
    color: inherit;
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  picture {
    min-height: 40px;
    min-width: 60px;
    background: transparent;
  }
`;
