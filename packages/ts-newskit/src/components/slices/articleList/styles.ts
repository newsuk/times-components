import { styled, TextBlock, Block } from 'newskit';

export const ArticleListFooterWrapper = styled(Block)`
  span {
    border-left: 1px solid #ccc;

    &:first-child {
      border-left: none;
      padding-left: 0;
    }
  }
`;

export const ArticleListType = styled(TextBlock)<{ $color: string }>`
  color: ${({ $color }) => $color};
  border-left: 1px solid #ccc;
`;
