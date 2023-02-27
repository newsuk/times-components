import {
  getColorCssFromTheme,
  styled,
  Stack,
  Menu,
  getSpacingCssFromTheme,
  Divider,
  Hidden,
  getMediaQueryFromTheme,
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

const setMargin = (space: string) => ({ margin: `6px ${space}` });
export const AccountMenu = styled(Menu)`
  & li:last-of-type {
    ${getSpacingCssFromTheme(setMargin, 'space040')};
  }
`;

export const ScrollMenuContainer = styled(Visible)`
  & > div {
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

const setPadding = (space: string) => ({ padding: `${space}` });
export const HamburgerMenuContainer = styled(Drawer)`
  top: 50px;
  box-shadow: none;
  z-index: 2;

  ${getMediaQueryFromTheme('md')} {
    top: 60px;
  }

  & > div {
    ${getSpacingCssFromTheme(setPadding, 'space000')};
  }
`;
