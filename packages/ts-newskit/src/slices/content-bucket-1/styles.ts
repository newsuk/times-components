import {
  Cell,
  Divider,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  styled
} from 'newskit';

export const CellNoMargin = styled(Cell)`
  & {
    margin-top: 0;
  }
`;
export const LeadStoryCell = styled(CellNoMargin)`
  position: relative;
`;

const setMarginBottom = (space: string) => ({ right: space });
export const LeadStoryDivider = styled(Divider)`
  position: absolute;
  top: 0;
  ${getSpacingCssFromTheme(setMarginBottom, 'space020')};
`;
export const JournalistDivider = styled(Divider)`
  ${getMediaQueryFromTheme('md')} {
    height: 77px;
  }
`;
