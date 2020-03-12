import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import { IconForwardArrow } from "@times-components/icons";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import {
  InpContainer,
  InpCopy,
  InpIconContainer,
  InpImageContainer,
  InpPreferencesContainer,
  InpPreferencesText,
  InpSignup,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel,
  InpSignupText,
  InpSubcribedCopy,
  InpSubcribedHeadline,
  InpSubscribedContainer
} from "../styles/inline-newsletter-puff";

function onSignUpClick() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews");
  }
}

const InlineNewsletterPuff = ({
  label,
  headline,
  copy,
  isSubscribedToNewsletter
}) => (
  <InpContainer>
    <InpImageContainer>
      <Image
        aspectRatio={1.42}
        uri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg"
      />
    </InpImageContainer>
    {isSubscribedToNewsletter ? (
      <InpSubscribedContainer>
        <InpSubcribedHeadline>
          You’ve successfully signed up
        </InpSubcribedHeadline>
        <InpSubcribedCopy>
          Congratulations you can now enjoy daily updates from Red Box.
        </InpSubcribedCopy>
        <InpPreferencesContainer>
          <InpPreferencesText>
            Manage preferences here
            <InpIconContainer>
              <IconForwardArrow fillColour={colours.functional.action} />
            </InpIconContainer>
          </InpPreferencesText>
        </InpPreferencesContainer>
      </InpSubscribedContainer>
    ) : (
      <InpSignupContainer>
        <InpSignupLabel>{label}</InpSignupLabel>
        <InpSignupHeadline>{headline}</InpSignupHeadline>
        <InpCopy>{copy}</InpCopy>
        <InpSignupCTAContainer>
          <Link
            url="https://home.thetimes.co.uk/myNews"
            onPress={onSignUpClick}
          >
            <InpSignup>
              <InpSignupText>Sign up to newsletter</InpSignupText>
            </InpSignup>
          </Link>
        </InpSignupCTAContainer>
      </InpSignupContainer>
    )}
  </InpContainer>
);

InlineNewsletterPuff.propTypes = {
  label: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  isSubscribedToNewsletter: PropTypes.bool.isRequired
};

export default InlineNewsletterPuff;
