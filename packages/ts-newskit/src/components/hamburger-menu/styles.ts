import {
  Menu,
  styled,
  Button,
  getColorCssFromTheme,
  getMediaQueryFromTheme
} from 'newskit';
// Change border bottom back to white. 
export const StyledButton = styled(Button)<{ isSelected: boolean }>`
  font-size: 15px;
  ${({ isSelected }) =>
    isSelected
      ? getColorCssFromTheme('color', 'white')
      : getColorCssFromTheme('color', 'neutral050')};
  border-radius: 0px;
  border-bottom: ${({ isSelected }) =>
    isSelected
      ? '2px solid #FFFFFF !important'
      : '2px solid #333333 !important'};
  width: 100%;
  background-color: #151515;
  &:hover {
    border-bottom: 2px solid #eeeeee !important;
    background-color: #151515 !important;
    ${getColorCssFromTheme('color', 'white')};
  }
`;

export const StyledMenu = styled(Menu)`
  ul {
    justify-content: space-around;
  }
  li {
    width: 100%;
    margin: 0px;
  }
`;

export const MenuNav = styled(Menu)`
  height: 100vh;
  overflow-y: scroll;
  background-color: #151515;
  width: 320px;
  ${getMediaQueryFromTheme('sm', 'md')} {
    width: 520px;
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 320px;
  }
`;
