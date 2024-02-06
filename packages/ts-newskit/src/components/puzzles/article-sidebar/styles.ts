import { CardComposable, getColorCssFromTheme, styled } from 'newskit';

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
