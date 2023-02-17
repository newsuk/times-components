import { Menu, styled, getColorCssFromTheme } from 'newskit';

export const MenuDivider = styled.hr`
  width: calc(100% - 64px);
  margin: auto;
  border: 1px solid;
  ${getColorCssFromTheme('color', 'neutral010')};
`;

export const MainMenu = styled(Menu)`
  ul {
    display: flex;
    justify-content: center;
  }

  & li span {
    font-size: 14px;
    line-height: 20px;
    font-family: 'Roboto-Medium';
    height: 20px;
  }
`;
