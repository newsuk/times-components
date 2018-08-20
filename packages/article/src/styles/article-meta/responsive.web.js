import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

export const MetaTextElement = styled(Text)`
  border-top: 1px solid ${colours.functional.keyline};

  @media (min-width: ${breakpoints.medium}px) {
    padding-top: ${spacing(1)};
    padding-bottom: ${spacing(1)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    line-height: 18px;
    padding-bottom: ${spacing(5)};
  }
`;

export const Meta = styled(View)`
  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-left: 0;
    margin-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    padding-top: 0px;
    margin-bottom: 0;
  }
`;
