import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

export const MetaTextElement = styled(Text)`
  @media (min-width: ${breakpoints.wide}px) {
    border-top: 1px solid ${colours.functional.keyline};
    line-height: 18px;
    padding-bottom: ${spacing(5)};
  }
`;

export const Meta = styled(View)`
  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-left: ${spacing(0)};
    margin-right: ${spacing(0)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(0)};
    margin-bottom: ${spacing(0)};
    padding-bottom: ${spacing(0)};
  }
`;
