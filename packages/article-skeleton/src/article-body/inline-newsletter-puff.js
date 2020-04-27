import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import { IconForwardArrow } from "@times-components/icons";
import Link from "@times-components/link";
import Button from "@times-components/button";
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
  InpSubscribedContainer,
  buttonStyles
} from "../styles/inline-newsletter-puff";

import { useNewsletter } from "../hooks/use-newsletter";

function onSignUpClick() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews");
  }
}

const InlineNewsletterPuff = ({ label, headline, copy, newsletterId }) => {
  const {
    alreadySubscribed,
    isSubscribed,
    loading,
    subscribeNewsletter,
    subscribing
  } = useNewsletter(newsletterId);

  return (
    <InpContainer>
      <InpImageContainer>
        <Image
          aspectRatio={1.42}
          uri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg"
        />
      </InpImageContainer>
      {loading && (
        <InpSubscribedContainer>
          <InpSubcribedHeadline>Loading…</InpSubcribedHeadline>
        </InpSubscribedContainer>
      )}
      {!loading &&
        !isSubscribed && (
          <InpSignupContainer>
            <InpSignupLabel>{label}</InpSignupLabel>
            <InpSignupHeadline>{headline}</InpSignupHeadline>
            <InpCopy>{copy}</InpCopy>
            <InpSignupCTAContainer>
              {subscribing ? (
                <>Subscribing…</>
              ) : (
                <Button
                  title="Sign up to newsletter"
                  onPress={subscribeNewsletter}
                  style={buttonStyles}
                />
              )}
            </InpSignupCTAContainer>
          </InpSignupContainer>
        )}
      {!loading &&
        isSubscribed && (
          <InpSubscribedContainer>
            <InpSubcribedHeadline>
              {alreadySubscribed
                ? "alreadySubscribed"
                : "You’ve successfully signed up"}
            </InpSubcribedHeadline>
            <InpSubcribedCopy>
              {alreadySubscribed
                ? "alreadySubscribed"
                : "Congratulations you can now enjoy daily updates from Red Box."}
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
        )}
    </InpContainer>
  );
};

InlineNewsletterPuff.propTypes = {
  label: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  newsletterId: PropTypes.string.isRequired
};

export default InlineNewsletterPuff;
