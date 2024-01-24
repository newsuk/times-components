import {
  Block,
  Stack,
  getColorCssFromTheme,
  styled,
  getMediaQueryFromTheme,
  TextBlock,
  Divider,
  TitleBar,
  IconButton
} from 'newskit';

export const SliceHeaderWrapper = styled(Block)`
  & a:hover {
    cursor: pointer;

    h3 {
      ${getColorCssFromTheme('color', 'interactiveLink020')};
    }

    button {
      ${getColorCssFromTheme('backgroundColor', 'interface040')};
    }
  }

  & a:active {
    h3 {
      ${getColorCssFromTheme('color', 'interactiveLink030')};
    }
    button {
      ${getColorCssFromTheme('backgroundColor', 'interface050')};
    }
  }
`;

export const SliceHeaderLink = styled.a`
  all: unset;
`;

export const SliceHeaderContainer = styled(Stack)`
  min-height: 72px;
`;

export const TitleBarContainer = styled(Stack)`
  max-width: 760px;
`;

export const StyledTitleBar = styled(TitleBar)`
  ${getMediaQueryFromTheme('sm')} {
    white-space: nowrap;
  }
`;
export const StyledDivider = styled(Divider)`
  display: none;
  ${getMediaQueryFromTheme('sm')} {
    display: block;
    height: 28px;
  }
`;
export const StyledIconButton = styled(IconButton)`
  flex-shrink: 0;
`;
export const Tagline = styled(TextBlock)`
  display: none;
  ${getMediaQueryFromTheme('sm')} {
    display: block;
  }
`;
export const TaglineMob = styled(TextBlock)`
  ${getMediaQueryFromTheme('sm')} {
    display: none;
  }
`;
