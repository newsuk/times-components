import { getColorCssFromTheme, styled } from 'newskit';

export const TopNavContainer = styled.div`
  height: 60px;
  ${getColorCssFromTheme('backgroundColor', 'interface060')};
`;
