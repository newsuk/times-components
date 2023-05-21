import {
  Divider,
  styled,
  getColorCssFromTheme,
  getSpacingCssFromTheme,
  Block
} from 'newskit';

export const ArticleDividerXL = styled(Divider)`
  position: absolute;
  height: 100%;
  left: 50%;
`;
export const StyledDivider = styled(Divider)`
  ${getColorCssFromTheme('borderColor', 'interface050')};
`;

const setBlockMargin = (space: string) => ({ marginBlockStart: `-${space}` });
export const StyledBlock = styled(Block)`
  ${getSpacingCssFromTheme(setBlockMargin, 'space040')};
`;
