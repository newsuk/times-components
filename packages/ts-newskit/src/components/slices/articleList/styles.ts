import { styled, getSizingCssFromTheme, Block } from 'newskit';

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;
