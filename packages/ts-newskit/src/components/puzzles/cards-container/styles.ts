import { styled, TitleBar, getColorCssFromTheme } from 'newskit';

export const StyledTitleBar = styled(TitleBar)`
  ${getColorCssFromTheme('borderColor', 'interface060')};
  a {
    text-decoration: none;
  }
`;
