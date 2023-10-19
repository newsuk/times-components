import {
  Block,
  TextBlock,
  AccordionGroup,
  styled,
  LinkInline,
  getColorCssFromTheme,
  getSpacingCssFromTheme
} from 'newskit';

export const Container = styled(Block)`
  max-width: 620px;
  height: auto;
`;
export const Title = styled(TextBlock)`
  text-align: center;
`;

export const StyledAccordionGroup = styled(AccordionGroup)`
  ${getSpacingCssFromTheme('margin-bottom', 'space070')};
  font-family: Roboto;
  h3 button {
    ${getColorCssFromTheme('color', 'inkNotice')};
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
  ${getColorCssFromTheme('color', 'inkDark010')};
  text-decoration: none;
  font-family: Roboto;

  &:link,
  &:visited,
  &:hover span {
    ${getColorCssFromTheme('color', 'inkDark010')};
  }
`;
