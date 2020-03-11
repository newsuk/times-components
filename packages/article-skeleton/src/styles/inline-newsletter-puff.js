import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import { View, Text } from "react-native";

export const InpContainer = styled(View)`
  background-color: ${colours.functional.newsletterPuffBackground};
  display: flex;
  flex-direction: column;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(4)};
  margin-left: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    margin: 0 auto ${spacing(4)};
    width: 80.8%;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
export const InpImageContainer = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    width: 45%;
  }
`;

export const InpTextEditor = styled(View)`
  justify-content: center;
  padding-top: ${spacing(4)};
  padding-right: ${spacing(4)};
  padding-bottom: ${spacing(4)};
  padding-left: ${spacing(4)};
  @media (min-width: ${breakpoints.small}px) {
    padding-right: ${spacing(0)};
    padding-left: ${spacing(0)};
    flex: 1;
  }
`;

export const InpLabel = styled(Text)`
  font-family: ${fonts.supporting};
  font-size: ${fontSizes.newsletterPuffLabel}px;
  letter-spacing: 1px;
  color: ${colours.functional.brandColour};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: ${spacing(1)};
`;

export const InpHeadline = styled(Text)`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  text-align: center;
  font-size: ${fontSizes.newsletterPuffHeadline}px;
  text-decoration: none;
  margin-bottom: ${spacing(1)};
`;

export const InpCopy = styled(Text)`
  font-family: ${fonts.body};
  font-size: ${fontSizes.newsletterPuffCopy}px;
  text-align: center;
  color: ${colours.functional.primary};
  margin-bottom: ${spacing(3)};
`;

export const SignupContainer = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    width: 220px;
    margin: 0px auto;
  }
`;

export const Signup = styled(View)`
  border-width: 2px;
  border-style: solid;
  border-color: ${colours.functional.brandColour};
  font-family: ${fonts.supporting};
  letter-spacing: 0.2;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

export const SignupText = styled(Text)`
  font-size: ${fontSizes.newsletterPuffCopy}px;
  font-family: ${fonts.supporting};
`;

export const PreferencesContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const PreferencesText = styled(Text)`
  color: ${colours.functional.action};
`;

export const IconContainer = styled(View)`
  padding-left: 5px;
  padding-top: 6px;
`;
