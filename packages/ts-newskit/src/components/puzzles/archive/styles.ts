import { styled, Block, getColorCssFromTheme, AccordionGroup } from 'newskit';

export const CardContainer = styled(Block)`
    width: 100%;
    height: 138px;
    border: 1px solid #CCCCCC;
    border-radius: 6px;
    // ${getColorCssFromTheme('backgroundColor', 'interface050')};
    background-color: #F9F9F9;
`;

export const StyledAccordionGroup = styled(AccordionGroup)`
    button[aria-expanded="true"] {
    border-style: none none none none !important;
 }
`;


