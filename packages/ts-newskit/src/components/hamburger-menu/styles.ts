import styled from 'styled-components';
import { Menu } from 'newskit';

export const StyledMenu = styled(Menu)`
  ul {
    justify-content: space-around;
  }
  li {
    width: 100%;
    margin: 0px;
  }
`

export const HamburgerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
`;

export const MenuNav = styled(Menu)`
    overflow-y: scroll;
    background-color: #151515;
    width: 320px;
    @media(min-width: 520px){
      width: 520px;
    }
    @media(min-width: 768px) {
      width: 320px;
    }
`;