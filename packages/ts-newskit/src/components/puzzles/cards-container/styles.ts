import {
  styled,
  Block,
  getMediaQueryFromTheme,
  TitleBar,
  getColorCssFromTheme
} from 'newskit';

export const ContentWrapper = styled(Block)`
  // these widths will be acctually taken care by the main grid on puzzle page
  ${getMediaQueryFromTheme('xs')} {
    width: 100%;
  }
  ${getMediaQueryFromTheme('lg')} {
    max-width: 974px;
  }
  ${getMediaQueryFromTheme('xl')} {
    max-width: 1274px;
  }
`;

export const StyledTitleBar = styled(TitleBar)`
  border-style: dashed none none none;
  border-width: 1px;
  ${getColorCssFromTheme('borderColor', 'interface060')};
`;
