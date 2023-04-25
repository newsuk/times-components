import { styled, Block, AccordionGroup } from 'newskit';

export const CardContainer = styled(Block)`
  width: 100%;
  height: 138px;
`;

export const SeeMoreBox = styled(CardContainer)`
  border: 1px solid #cccccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

export const StyledAccordionGroup = styled(AccordionGroup)`
  button[aria-expanded='true'] {
    border-style: none none none none !important;
  }
`;
