import { getColorCssFromTheme, styled } from 'newskit';

export const TopNavContainer = styled.div`
  margin: 0;
  padding: 16px;
  ${getColorCssFromTheme('backgroundColor', 'interface060')};
`;

export const MenuWrapper = styled.div`
  height: 50px;
  margin: 0;
  display: none;

  // @media (min-width: 1024px) {
  //   &:nth-child(-n+4) {
  //     display: block;
  //   }
  // }
`;
