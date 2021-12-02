import { View } from "react-native";
import styled from "styled-components";
import { breakpoints } from "../styleguide";

export const CardWrapper = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    .exampleCardImage {
      flex-grow: 2 !important;
      margin-bottom: 0;
      min-width: 360px;
      padding-right: 15px;
    }
    .exampleCardContent {
      flex-grow: 2.7 !important;
      min-width: 380px;
    }
  }
`;

export const ReversedCardWrapper = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    .exampleCardImage {
      flex-grow: 2 !important;
      margin-bottom: 0;
      min-width: 360px;
      padding-left: 15px;
    }
    .exampleCardContent {
      flex-grow: 2.7 !important;
      min-width: 380px;
    }
  }
`;
