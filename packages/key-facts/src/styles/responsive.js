import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

export const KeyFactsResponsiveContainer = styled(View)`

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const KeyFactsResponsiveWrapper = styled(View)`
  
`;

export const KeyFactsTitleResponsive = styled(Text)`
`;
