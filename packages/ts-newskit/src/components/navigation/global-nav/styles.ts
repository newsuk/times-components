import {
  styled,
  getColorCssFromTheme,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  Stack,
  Menu,
  Divider,
  Hidden,
  IconButton,
  Drawer,
  Visible
} from 'newskit';

export const TopNavContainer = styled(Stack)`
  height: 60px;
  margin: 0;
  position: relative;
  ${getColorCssFromTheme('backgroundColor', 'interface060')};
  ${getMediaQueryFromTheme('xs', 'md')} {
    height: 50px;
  }
  z-index: 1;
`;

export const TopNavHide = styled(Hidden)`
  height: 100%;
`;

export const MastheadMob = styled(Hidden)`
  height: 100%;
  position: absolute;
  width: 100%;
  justify-content: center;
`;

const setAccountMenuMargin = (space: string) => ({ margin: `6px ${space}` });
export const AccountMenu = styled(Menu)`
  & li:last-of-type {
    ${getSpacingCssFromTheme(setAccountMenuMargin, 'space040')};
  }
`;

export const LoggedOutButtonsContainer = styled(Stack)`
  ${getColorCssFromTheme('backgroundColor', 'neutral090')};
  & > div {
    width: 100%;
    z-index: 1;
  }
`;

export const ScrollMenuContainer = styled(Visible)`
  & > div:last-of-type {
    background-color: white;
    z-index: 0;
  }
`;

const setPaddingRight = (space: string) => ({ paddingRight: `${space}` });
export const ScrollMenu = styled(Menu)`
  & li:last-of-type {
    ${getSpacingCssFromTheme(setPaddingRight, 'space030')};
  }
`;
export const MenuScrollDivider = styled(Divider)`
  ${getColorCssFromTheme('borderColor', 'interface040')};
`;

export const TopNavIcon = styled(IconButton)`
  height: 50px;
  width: 50px;
  z-index: 1;

  ${getColorCssFromTheme('color', 'inkInverse')};

  ${getMediaQueryFromTheme('md')} {
    height: 60px;
    width: 60px;
  }

  & > svg {
    height: auto;
    width: auto;
  }
`;

const setHamburgerMenuPadding = (space: string) => ({ padding: `${space}` });
export const HamburgerMenuContainer = styled(Drawer)<{ isLoggedIn?: boolean }>`
  top: ${({ isLoggedIn }) => (isLoggedIn ? '50px' : '114px')};
  box-shadow: none;
  z-index: 2;

  ${getMediaQueryFromTheme('md')} {
    top: 60px;
  }

  & > div {
    ${getSpacingCssFromTheme(setHamburgerMenuPadding, 'space000')};
  }
`;

export const HamburgerStyledMenu = styled(Menu)`
  ul {
    justify-content: space-around;
  }
  li {
    width: 100%;
    margin: 0;
  }
`;

export const HamburgerMenuNav = styled(Menu)`
  height: 100vh;
  overflow-y: scroll;
  background-color: #151515;
  width: 100%;
`;
