import React, { useState } from "react";
import { Linking, Platform } from "react-native";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";

import { GetNewsletter } from "@times-components/provider";
import { subscribeNewsletter } from "@times-components/provider-queries";
import Image, { Placeholder } from "@times-components/image";

import {
  InpContainer,
  InpCopy,
  InpImageContainer,
  InpPreferencesContainer,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel,
  InpSubscribedContainer,
  InpSubscribedCopy,
  InpSubscribedHeadline
} from "../styles/inline-newsletter-puff";
import NewsletterPuffButton from "./newsletter-puff-button";
import NewsletterPuffLink from "./newsletter-puff-link";

function onManagePreferencesPress() {
  if (Platform.OS !== "web") {
    Linking.canOpenURL("https://home.thetimes.co.uk/myNews")
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }
}

function onPressButton(subscribeNewsletter, updatingSubscription, code) {
  if (!updatingSubscription) {
    subscribeNewsletter({ variables: { code } });
  }
}

const InlineNewsletterPuff = ({
  analyticsStream,
  code,
  copy,
  headline,
  imageUri,
  label
}) => {
  const [justSubscribed, setJustSubscribed] = useState(false);

  return (
    <GetNewsletter variables={{ code }} ssr={false} debounceTimeMs={0}>
      {({ loading, data, error }) => {
        if (error) {
          console.log("errorrrrrrrrr");
          console.log(error);
          console.log("errorrrrrrrrr");
          return null;
        }

        if (loading || !data || !data.newsletter) {
          return (
            <InpContainer style={{ height: 257 }}>
              <Placeholder />
            </InpContainer>
          );
        }

        const { newsletter } = data;

        if (newsletter.isSubscribed && !justSubscribed) {
          console.log("isSubscribed");
          console.log("isSubscribed");
          return null;
        }

        return (
          <Mutation
            mutation={subscribeNewsletter}
            onCompleted={({ subscribeNewsletter = {} }) => {
              setJustSubscribed(subscribeNewsletter.isSubscribed);
            }}
          >
            {(subscribeNewsletter, { loading: updatingSubscription }) => (
              <InpContainer>
                <InpImageContainer>
                  <Image aspectRatio={1.42} uri={imageUri} />
                </InpImageContainer>
                {justSubscribed ? (
                  <InpSubscribedContainer>
                    <InpSubscribedHeadline>
                      You’ve successfully signed up
                    </InpSubscribedHeadline>
                    <InpSubscribedCopy>
                      Congratulations you can now enjoy daily updates from Red
                      Box.
                    </InpSubscribedCopy>
                    <InpPreferencesContainer>
                      <NewsletterPuffLink
                        analyticsStream={analyticsStream}
                        onPress={() => onManagePreferencesPress()}
                      />
                    </InpPreferencesContainer>
                  </InpSubscribedContainer>
                ) : (
                  <InpSignupContainer>
                    <InpSignupLabel>{label}</InpSignupLabel>
                    <InpSignupHeadline>{headline}</InpSignupHeadline>
                    <InpCopy>{copy}</InpCopy>
                    <InpSignupCTAContainer>
                      <NewsletterPuffButton
                        analyticsStream={analyticsStream}
                        updatingSubscription={updatingSubscription}
                        onPress={() =>
                          onPressButton(
                            subscribeNewsletter,
                            updatingSubscription,
                            code
                          )
                        }
                      />
                    </InpSignupCTAContainer>
                  </InpSignupContainer>
                )}
              </InpContainer>
            )}
          </Mutation>
        );
      }}
    </GetNewsletter>
  );
};

export default InlineNewsletterPuff;

InlineNewsletterPuff.propTypes = {
  analyticsStream: PropTypes.func,
  code: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
