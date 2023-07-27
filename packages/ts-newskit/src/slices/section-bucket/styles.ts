import { Block, styled, getMediaQueryFromTheme } from 'newskit';

export const StyledBlock = styled(Block)`
  ${getMediaQueryFromTheme('xs', 'md')} {
    width: 220px;
  }
`;
