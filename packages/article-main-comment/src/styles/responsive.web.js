import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

/* --- Header --- */

export const HeaderContainer = styled(View)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  order: 2;

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


