import { Block, styled, TextBlock } from 'newskit';

export const StyledTextBlock = styled(TextBlock)`
  text-align: center;
`;

export const HintContainerBlock = styled(Block)`
  display: flex;
  flex-wrap: wrap-reverse;
  background-color: #feeedc;

  & > div {
    width: 100%;
  }
`;
