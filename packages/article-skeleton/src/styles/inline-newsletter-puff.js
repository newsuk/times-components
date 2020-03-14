import styled from "styled-components";
import { View, Text } from "react-native";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

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

export const InpSubscribedContainer = styled(View)`
  justify-content: center;
  padding: ${spacing(9)}px ${spacing(8)}px;
  @media (min-width: ${breakpoints.small}px) {
    padding: ${spacing(0)} ${spacing(1)};
    flex: 1;
  }
`;

export const InpSubcribedHeadline = styled(Text)`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  text-align: center;
  font-size: ${fontSizes.newsletterPuffHeadline}px;
  text-decoration: none;
  margin-bottom: ${spacing(2)};
`;

export const InpSubcribedCopy = styled(Text)`
  font-family: ${fonts.body};
  font-size: ${fontSizes.newsletterPuffCopy}px;
  text-align: center;
  color: ${colours.functional.primary};
  margin-bottom: ${spacing(2)};
  @media (min-width: ${breakpoints.small}px) {
    padding: ${spacing(0)} ${spacing(1)};
    margin-bottom: ${spacing(1)};
  }
  @media (min-width: ${breakpoints.medium}px) {
    padding: ${spacing(0)} ${spacing(4)};
  }
`;

export const InpSignupContainer = styled(View)`
  justify-content: center;
  padding: ${spacing(4)}px;
  @media (min-width: ${breakpoints.small}px) {
    padding: ${spacing(0)} ${spacing(4)};
    flex: 1;
  }
`;

export const InpSignupLabel = styled(Text)`
  font-family: ${fonts.supporting};
  font-size: ${fontSizes.newsletterPuffLabel}px;
  letter-spacing: 1px;
  color: ${colours.functional.brandColour};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: ${spacing(1)};
`;

export const InpSignupHeadline = styled(Text)`
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

export const InpSignupCTAContainer = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    width: 220px;
    margin: 0px auto;
  }
`;

export const InpSignup = styled(View)`
  border-width: 2px;
  border-style: solid;
  border-color: ${colours.functional.brandColour};
  font-family: ${fonts.supporting};
  letter-spacing: 0.2;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

export const InpSignupText = styled(Text)`
  font-size: ${fontSizes.newsletterPuffCopy}px;
  font-family: ${fonts.supporting};
`;

export const InpPreferencesContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const InpPreferencesText = styled(Text)`
  color: ${colours.functional.action};
`;

export const InpIconContainer = styled(View)`
  padding-left: 5px;
  padding-top: 6px;
`;
