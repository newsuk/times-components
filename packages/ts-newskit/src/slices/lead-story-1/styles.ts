import {
  Divider,
  styled,
  getColorCssFromTheme,
  getSpacingCssFromTheme,
  Block
} from 'newskit';

export const StyledDivider = styled(Divider)`
  ${getColorCssFromTheme('borderColor', 'interface050')};
`;

const setBlockMargin = (space: string) => ({ marginBlockStart: `-${space}` });
export const BlockNoTopMargin = styled(Block)`
  ${getSpacingCssFromTheme(setBlockMargin, 'space040')};
`;
