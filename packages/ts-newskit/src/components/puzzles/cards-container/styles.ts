import {
  styled,
  Block,
  getMediaQueryFromTheme,
  GridLayoutItem,
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

export const StyledGridLayoutItem = styled(GridLayoutItem)`
  // delete below once Puzzle card is merged!!!
  border: 1px solid #cccccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  width: 100%;
  ${getMediaQueryFromTheme('xs')} {
    height: 168px;
  }
  ${getMediaQueryFromTheme('sm')} {
    height: 201.33px;
  }
  ${getMediaQueryFromTheme('md')} {
    height: 186.67px;
  }
  ${getMediaQueryFromTheme('lg')} {
    height: 211.33px;
  }
  ${getMediaQueryFromTheme('xl')} {
    height: 261.33px;
  }
`;
