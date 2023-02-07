import styled from 'styled-components';
import { Menu, Button, IconButton, getColorCssFromTheme, getSizingCssFromTheme } from 'newskit';

export const StyledMenu = styled(Menu)`
  ul {
    justify-content: space-around;
  }
  li {
    width: 100%;
  }
`

export const StyledButton = styled(Button)`
  border-radius: 2px !important;
`

export const MenuNav = styled(Menu)`
  &.menuNav {
    overflow-y: scroll;
    background-color: #151515;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 0;
    max-width: 320px;
    z-index: 9;
    &.showMenu {
      width: 100%;
    }
  }
`;

export const NavButton = styled(IconButton)`
  &.navButton {
    position: fixed;
    top: 0;
  }
  &.hideButton {
    display: none
  }
`;