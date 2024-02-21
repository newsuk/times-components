// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
