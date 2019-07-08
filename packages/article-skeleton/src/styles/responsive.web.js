import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";
import { ArticleKeylineItem } from "../keylines";

export const MainContainer = styled(View)`
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(4)};
    margin: 0 auto;
  }
`;

export const HeaderAdContainer = styled(View)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: 1px;
    padding-top: ${spacing(2)};
    padding-bottom: ${spacing(2)};
  }
`;

export const HeaderContainer = styled(View)`
  display: flex;

  /* stylelint-disable */
  > ${ArticleKeylineItem} {
    order: 3;
  }
  /* stylelint-enable */
`;

export const BodyContainer = styled(View)`
  display: block;
  order: 4;
`;
