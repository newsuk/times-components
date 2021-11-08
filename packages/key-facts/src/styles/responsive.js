import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

export const KeyFactsResponsiveContainer = styled(View)`
  margin: 5px 10px;

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    margin: 10px auto;
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const KeyFactsResponsiveWrapper = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    width: 75%;
  }
`;

export const KeyFactsTitleResponsive = styled(Text)`
  @media (min-width: ${breakpoints.medium}px) {
    padding-right: ${spacing(4)};
    width: 25%;
  }
`;
