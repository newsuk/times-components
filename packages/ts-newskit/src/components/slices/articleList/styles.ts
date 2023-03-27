import { styled, TextBlock, getSizingCssFromTheme, Block } from 'newskit';
export const ArticleListType = styled(TextBlock)<{ $color: string }>`
  color: ${({ $color }) => ($color ? $color : '#666')};

`;
export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;
