import { Text, View } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const AuthorImageContainer = styled(View)`
  border-radius: 50%;
  height: 100px;
  overflow: hidden;
  width: 100px;

  @media (min-width: ${breakpoints.medium}px) {
    height: 118px;
    width: 118px;
  }
`;

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

export const MetaContainer = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
  }
`;

export const Seperator = styled(View)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    background-color: ${colours.functional.keyline}
    display: flex;
    height: 16px;
    margin: 0 ${spacing(2)};
    width: 1px;

  }
`
