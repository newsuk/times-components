import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

/* --- Header --- */

export const HeaderContainer = styled(View)`
  align-items: center,
  border-bottom-width: 1,
  border-bottom-color: ${colours.functional.keyline},
  margin-bottom: ${spacing(4)};
  padding-bottom: ${spacing(5)};
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  order: 2;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: ${spacing(7)};
    margin-bottom: ${spacing(6)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    padding-bottom: ${spacing(7)};
    margin-bottom: ${spacing(7)};
  }
`;


