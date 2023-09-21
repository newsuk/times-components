import { styled, getSpacingCssFromTheme, Block } from 'newskit';

const setBlockMargin = (space: string) => ({ marginBlockStart: `-${space}` });
export const BlockNoTopMargin = styled(Block)`
  ${getSpacingCssFromTheme(setBlockMargin, 'space040')};
`;
