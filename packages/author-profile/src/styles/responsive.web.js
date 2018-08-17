import { Text, View } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const AuthorHeadWrapper = styled(View)`
  width: 100%;
  padding-top: 30px;

  @media (min-width: ${breakpoints.medium}px) {
    padding-top: 60px;
  }
`;

export const AuthorNameWrapper = styled(Text)`
  color: ${colours.functional.brandColour};
  font-family: "${fonts.headline}";
  font-size: ${fontSizes.headline}px;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.articleHeadline}px;
  }
`;

export const BioContainer = styled(View)`
  width: 100%;
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;
    max-width: 680px;
  }

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 760px;
  }
`;

export const ImageContainer = styled(View)`
  width: 100px;

  @media (min-width: ${breakpoints.medium}px) {
    width: 116px;
  }
`;
