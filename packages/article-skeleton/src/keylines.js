import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";

export const KeylineItem = styled.div`
  border: solid ${colours.functional.keyline};
  border-width: 1px 0;

  & + & {
    margin-top: -1px !important;
  }
`;

export const ArticleKeylineItem = styled(KeylineItem)`
  @media (min-width: ${breakpoints.medium}px) {
    margin: 0 auto;
  }

  &:last-child {
    margin-bottom: ${spacing(6)};
  }

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }

  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};
`;
