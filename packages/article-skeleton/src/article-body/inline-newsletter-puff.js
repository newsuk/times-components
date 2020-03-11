import React from "react";
import { Platform } from "react-native";

import Image from "@times-components/image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import { IconForwardArrow } from "@times-components/icons";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import {
  InpContainer,
  InpImageContainer,
  InpTextEditor,
  InpLabel,
  InpHeadline,
  InpCopy,
  SignupContainer,
  Signup,
  SignupText,
  PreferencesContainer,
  PreferencesText,
  IconContainer
} from "../styles/inline-newsletter-puff";

function onSignUpClick() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews");
  }
}

const InlineNewsletterPuff = props => {
  const { label, headline, copy } = { ...props };
  const isSubscribed = false;
  return (
    <InpContainer>
      <InpImageContainer>
        <Image
          aspectRatio={1.42}
          uri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg"
        />
      </InpImageContainer>

      <InpTextEditor>
        <InpLabel>{label}</InpLabel>
        <InpHeadline>{headline}</InpHeadline>
        <InpCopy>{copy}</InpCopy>
        {!isSubscribed ? (
          <SignupContainer>
            <Link
              url="https://home.thetimes.co.uk/myNews"
              onPress={onSignUpClick}
            >
              <Signup>
                <SignupText>Sign up to newsletter</SignupText>
              </Signup>
            </Link>
          </SignupContainer>
        ) : (
          <PreferencesContainer>
            <PreferencesText>
              Manage preferences here
              <IconContainer>
                <IconForwardArrow fillColour={colours.functional.action} />
              </IconContainer>
            </PreferencesText>
          </PreferencesContainer>
        )}
      </InpTextEditor>
    </InpContainer>
  );
};

export default InlineNewsletterPuff;
