import {
  Cell,
  Divider,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  styled,
  Grid
} from 'newskit';

export const CellNoMargin = styled(Cell)`
  & {
    margin-top: 0;
    padding: 0 16px;
  }
`;

const setBlockMargin = (space: string) => ({ marginBlockStart: `${space}` });
export const LeadArticleCell = styled(CellNoMargin)`
  & {
    padding: 0 16px;
  }
  position: relative;
  ${getMediaQueryFromTheme('md')} {
    ${getSpacingCssFromTheme(setBlockMargin, 'space040')};
  }
`;

export const LeadStoryCell = styled(CellNoMargin)`
  & {
    padding: 0 16px;
  }
  position: relative;
`;

export const LeadStoryDivider = styled(Divider)<{ position: string }>`
  position: absolute;
  top: 0;
  ${({ position }) => getSpacingCssFromTheme(position, 'space000')};
`;

export const AvatarDivider = styled(Divider)`
  ${getMediaQueryFromTheme('md')} {
    height: 100%;
  }
`;

export const CellWithCustomPadding = styled(Cell)`
  & {
    padding: 0 16px;
  }
`;

export const StyledLeadStoryCell = styled(CellWithCustomPadding)`
  position: relative;
`;

export const StyledGrid = styled(Grid)`
  margin: 0;
  width: 100%;
`;
