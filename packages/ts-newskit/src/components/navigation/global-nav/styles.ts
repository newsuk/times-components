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

  ${getMediaQueryFromTheme('lg', 'xl')} {
    & nav[aria-label='Main menu'] > ul > li {
      display: none;
    }
    & nav[aria-label='Main menu'] > ul > li:nth-child(-n + 4) {
      display: block;
    }
  }
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

export const HamburgerIconButton = styled(TopNavIcon)``;

export const HamburgerIcon = styled.div`
  --transition: 0.25s ease-in-out;

  height: 16px;
  width: 16px;

  position: relative;
  margin: auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);

  span {
    display: block;
    position: absolute;
    height: 1.5px;
    width: 100%;
    left: 0;
    ${getColorCssFromTheme('background', 'inkInverse')};
    opacity: 1;

    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;

    -webkit-transition: var(--transition);
    -moz-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  span:nth-child(1) {
    top: 2px;
  }

  span:nth-child(2) {
    top: 7px;
    width: 75%;
  }

  span:nth-child(3) {
    top: 12px;
  }

  &.open {
    transform: scale(0.875);
  }

  &.open span:nth-child(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 0.25px;
    left: 1px;
    width: 19.8px;
  }

  &.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
  }

  &.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    top: 14.25px;
    left: 1px;
    width: 19.8px;
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
