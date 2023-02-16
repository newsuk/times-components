import { Menu, styled, getMediaQueryFromTheme } from 'newskit';

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
