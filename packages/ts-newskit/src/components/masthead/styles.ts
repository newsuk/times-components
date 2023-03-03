import { styled, Block, DateTime } from 'newskit';

export const Masthead = styled(Block)`
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
`;

export const MastheadDate = styled(DateTime)`
  textTransform: 'capitalize',
  display: 'block'
`;
