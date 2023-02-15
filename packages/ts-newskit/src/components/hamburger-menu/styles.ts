import {
  Menu,
  styled,
  Button,
  TextBlock,
  getColorCssFromTheme,
  getMediaQueryFromTheme
} from 'newskit';

export const StyledButton = styled(Button)<{ isSelected: boolean }>`
  border-radius: 0px;
  border-bottom: ${({ isSelected }) =>
    isSelected
      ? '2px solid #FFFFFF !important'
      : '2px solid #C2C2C2 !important'};
  width: 100%;
  font-family: Roboto-Regular;
  background-color: #151515;
  &:hover {
    border-bottom: 2px solid #ffffff !important;
    background-color: #151515 !important;
  }
`;

export const StyledTextBlock = styled(TextBlock)<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected
      ? getColorCssFromTheme('color', 'white')
      : getColorCssFromTheme('color', 'neutral050')} font-size: 15px;
  &:hover {
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
