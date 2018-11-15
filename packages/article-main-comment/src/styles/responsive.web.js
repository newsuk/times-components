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

  font-family: "${fonts.headline}";
  font-weight: 400;
  line-height: 30px;

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
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${spacing(3)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-top: 0;
  }
`;

export const MetaContainer = styled(View)`
  align-items: center;

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: ${spacing(3)};
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
`;

export const StandfirstContainer = styled(Text)`
  text-align: center;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: 22px;
    line-height: 30px;
  }
`;

export const HeaderContainer = styled(View)`
  align-items: center;
  align-self: center;
  border-bottom: 1px ${colours.functional.keyline} solid;
  margin-bottom: ${spacing(4)};
  padding-bottom: ${spacing(5)};
  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};
  order: 2;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: ${spacing(7)};
    margin-bottom: ${spacing(6)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    padding-bottom: ${spacing(7)};
    margin-bottom: ${spacing(7)};
  }
`;
