import {
  getColorCssFromTheme,
  styled,
  Stack,
  Menu,
  getSpacingCssFromTheme,
  Divider,
  Hidden,
  getMediaQueryFromTheme,
  IconButton
} from 'newskit';

export const TopNavContainer = styled(Stack)`
  height: 60px;
  margin: 0;
  position: relative;
  ${getColorCssFromTheme('backgroundColor', 'interface060')};
  ${getMediaQueryFromTheme('xs', 'md')} {
    height: 50px;
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

const setMargin = (space: string) => ({ margin: `6px ${space}` });
export const AccountMenu = styled(Menu)`
  & li:last-of-type {
    ${getSpacingCssFromTheme(setMargin, 'space040')};
  }
`;

const setPadding = (space: string) => ({ paddingRight: `${space}` });
export const ScrollMenu = styled(Menu)`
  & li:last-of-type {
    ${getSpacingCssFromTheme(setPadding, 'space030')};
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
`;
