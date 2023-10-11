import { Block, TextBlock, AccordionGroup, styled } from 'newskit';

export const Container = styled(Block)`
  max-width: 620px;
`;
export const Title = styled(TextBlock)`
  text-align: center;
`;

export const StyledAccordionGroup = styled(AccordionGroup)`
  h3 button {
    color: #333333;
    border-bottom-style: solid;

    &:hover {
      color: #333333 !important;
    }
  }
  [data-testid='accordion-content'] {
    color: #3b3b3b;
    font-weight: 400;
    font-size: 16px;
    white-space: pre-line;
    line-height: 24px;
  }
`;
