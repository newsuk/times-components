import {
  styled,
  Block,
  DateTime,
  getColorCssFromTheme,
  getSpacingCssFromTheme
} from 'newskit';

export const Masthead = styled(Block)`
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
`;

const setPaddingBottom = (space: string) => ({ paddingBottom: `${space}` });
export const MastheadDate = styled(DateTime)`
  & > span {
    ${getColorCssFromTheme('color', 'inkBase')};
    ${getSpacingCssFromTheme(setPaddingBottom, 'space030')};
  }
`;
