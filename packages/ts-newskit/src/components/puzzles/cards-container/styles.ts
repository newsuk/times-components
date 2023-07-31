import { styled, TitleBar, getColorCssFromTheme } from 'newskit';

export const StyledTitleBar = styled(TitleBar)`
  border-style: dashed none none none;
  border-width: 1px;
  ${getColorCssFromTheme('borderColor', 'interface060')};
  a {
    text-decoration: none;
  }
`;
