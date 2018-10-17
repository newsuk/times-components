import { View } from "react-native";
import styled from "styled-components";
import { breakpoints } from "@times-components/styleguide";

export const TopicsMetaContainer = styled(View)`
  display: none;

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
`;
