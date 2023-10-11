import { Block, TextBlock, AccordionGroup, styled, LinkInline } from 'newskit';

export const Container = styled(Block)`
  max-width: 620px;
  max-height: 457px;
`;
export const Title = styled(TextBlock)`
  text-align: center;
`;

export const StyledAccordionGroup = styled(AccordionGroup)`
  margin-bottom: 40px;
  font-family: Roboto;
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
    border-bottom-style: solid;
  }
`;

export const SeeAll = styled(LinkInline)`
  display: block;
  margin: 0 auto;
  width: 90px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #01000d;
  text-decoration: none;
  font-family: Roboto;

  &:link,
  &:visited,
  &:hover span {
    color: #01000d;
  }
`;
