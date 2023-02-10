import { getColorCssFromTheme, styled } from 'newskit';

export const TopNavContainer = styled.div`
  margin: 0;
  padding: 16px;
  ${getColorCssFromTheme('backgroundColor', 'interface060')};
`;
