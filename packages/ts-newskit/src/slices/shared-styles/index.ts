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

export const LeadStoryDivider = styled(Divider)<{ position: string }>`
  position: absolute;
  top: 0;
  ${({ position }) => getSpacingCssFromTheme(position, 'space010')};
`;

export const AvatarDivider = styled(Divider)`
  ${getMediaQueryFromTheme('md')} {
    height: 77px;
  }
`;
