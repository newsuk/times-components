import { Block, Stack, getColorCssFromTheme, styled } from 'newskit';

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
