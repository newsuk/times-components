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

export const MenuItems = styled.div`
  margin-top: -2px;
  &:hover {
    margin-top: -2px;
    ${getColorCssFromTheme('background', 'neutral010')};
  }
`;

export const MenuWrapper = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  ${getColorCssFromTheme('background', 'neutral010')};
`;

export const MenuItemsWrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
`;

export const TextBlockWrapper = styled.div`
  margin-top: 16px;
  padding-left: 6px;
`;
