import {
  styled,
  TitleBar,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  Block
} from 'newskit';

export const StyledTitleBar = styled(TitleBar)`
  ${getColorCssFromTheme('borderColor', 'interface060')};
  a {
    text-decoration: none;
  }
`;

export const GridItemWithDivider = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    position: relative;
    ::after {
      content: '';
      position: absolute;
      top: 0;
      right: -16px;
      height: 100%;
      width: 1px;
      ${getColorCssFromTheme('background-color', 'interface030')};
    }

    &.last-in-row::after {
      content: none;
    }
  }
`;
