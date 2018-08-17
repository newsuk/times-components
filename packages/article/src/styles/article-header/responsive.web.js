import { Text, View } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes
} from "@times-components/styleguide";

export const HeadlineContainer = styled(Text)`
  font-size: ${fontSizes.headline}px;
  color: ${colours.functional.brandColour};
  margin-bottom: 8px;
  font-family: "${fonts.headline}";
  font-weight: 400;
  line-height: 30px;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.articleHeadline}px;
    line-height: 45px;
  }
`;

export const LabelContainer = styled(View)`
  @media (min-width: ${breakpoints.wide}px) {
    margin-top: 0px;
  }
`;
