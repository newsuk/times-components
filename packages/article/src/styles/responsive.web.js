import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

export const MainContainer = styled(View)`
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(4)};
    margin: 0 auto;
    display: block;
  }
`;

/* --- HeaderAd --- */
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

/* --- Header --- */

export const HeaderContainer = styled(View)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  // order: 1;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    margin-bottom: ${spacing(3)};
  }
`;

export const BodyContainer = styled(View)`
  // order: 2;
  display: block;
`;
