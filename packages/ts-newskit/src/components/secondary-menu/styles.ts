import {
  Menu,
  styled,
  getColorCssFromTheme,
  getSpacingCssFromTheme
} from 'newskit';
import { MainMenuProp } from './types';

export const MenuDivider = styled.hr`
  width: calc(100% - 64px);
  margin: auto;
  border: 1px solid;
  ${getColorCssFromTheme('color', 'neutral010')};
`;
const setPadding = (space: string) => ({ paddingRight: `${space}` });

export const MainMenu = styled(Menu)<MainMenuProp>`
  ${getSpacingCssFromTheme(setPadding, 'space045')};
  ul {
    justify-content: ${({ hasMoreItems }) => (hasMoreItems ? `end` : `center`)};
  }
`;

export const MenuDividerDesktop = styled.hr`
  margin: 0;
  border: 1px solid;
  ${getColorCssFromTheme('color', 'neutral030')};
`;

export const MenuContainer = styled(Menu)`
  ul {
    display: flex;
    justify-content: flex-end;
    background-color: #f5f5f5;
    float: right;
    width: max-content;
    min-width: 200px;
  }

  & hr:last-child {
    display: none;
  }

  li:hover {
    background-color: #e4e4e4;
  }
`;
