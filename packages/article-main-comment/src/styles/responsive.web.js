import { Text, View } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fontSizes,
  lineHeight,
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

export const DatePublicationContainer = styled(Text)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${spacing(3)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-top: 0;
  }
`;

export const FlagsContainer = styled(View)`
  padding-top: ${spacing(1)};
  padding-bottom: ${spacing(3)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-top: 0;
  }
`;

export const HeaderContainer = styled(View)`
  order: 2;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto ${spacing(2)};
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const HeadlineContainer = styled(Text)`
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.articleHeadline}px;
    line-height: 50px;
    margin-bottom: ${spacing(1)};
  }
`;

export const LabelContainer = styled(View)`
  @media (min-width: ${breakpoints.wide}px) {
    margin-top: 0px;
  }
`;

export const Meta = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    margin-top: 0;
  }
`;

export const MetaContainer = styled(View)`
  align-items: center;

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Separator = styled(View)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    background-color: ${colours.functional.keyline};
    display: flex;
    height: ${spacing(3)};
    margin: 0 ${spacing(2)};
    width: 1px;
  }
`;

export const StandfirstContainer = styled(Text)`
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.infoTitle}px;
    line-height: ${lineHeight({
      font: "bodyRegular",
      fontSize: "infoTitle"
    })}px;
    margin-bottom: ${spacing(5)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    margin-bottom: ${spacing(4)};
  }
`;
