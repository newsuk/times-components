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

const setRightPos = (space: string) => ({ right: space });
export const LeadStoryDivider = styled(Divider)`
  position: absolute;
  top: 0;
  ${getSpacingCssFromTheme(setRightPos, 'space010')};
`;
export const AvatarDivider = styled(Divider)`
  ${getMediaQueryFromTheme('md')} {
    height: 77px;
  }
`;
