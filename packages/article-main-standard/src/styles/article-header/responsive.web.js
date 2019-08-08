import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes
} from "@times-components/styleguide";

export const HeadlineContainer = ({ children, ...props }) => {
  const H1 = styled.h1`
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

  return <H1 {...props}>{children}</H1>;
};

export const LabelContainer = styled(View)`
  @media (min-width: ${breakpoints.wide}px) {
    margin-top: 0px;
  }
`;
