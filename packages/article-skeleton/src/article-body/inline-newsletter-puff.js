import React, { useState } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import { Query, Mutation } from "react-apollo";

import Image, { Placeholder } from "@times-components/image";
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
  InpPreferencesView,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel,
  InpSubscribedContainer,
  InpSubscribedCopy,
  InpSubscribedHeadline
} from "../styles/inline-newsletter-puff";
import { GET_NEWSLETTER, SUBSCRIBE_NEWSLETTER } from "./newsletter-gql-queries";
import NewsletterPuffButton from "./newsletter-puff-button";

function onManagePreferencesPress() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews");
  }
}

function onPressButton(subscribeNewsletter, updatingSubscription, code) {
  if (!updatingSubscription) {
    subscribeNewsletter({ variables: { code } });
  }
}

const InlineNewsletterPuff = ({ code, copy, headline, imageUri, label }) => {
  const [justSubscribed, setJustSubscribed] = useState(false);

  return (
    <Query query={GET_NEWSLETTER} variables={{ code }} ssr={false}>
      {({ loading, data, error }) => {
        if (error) {
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
          return null;
        }

        return (
          <Mutation
            mutation={SUBSCRIBE_NEWSLETTER}
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
                      <Link
                        url="https://home.thetimes.co.uk/myNews"
                        onPress={onManagePreferencesPress}
                      >
                        <InpPreferencesView>
                          <InpPreferencesText>
                            Manage preferences here
                          </InpPreferencesText>
                          <InpIconContainer>
                            <IconForwardArrow
                              fillColour={colours.functional.action}
                            />
                          </InpIconContainer>
                        </InpPreferencesView>
                      </Link>
                    </InpPreferencesContainer>
                  </InpSubscribedContainer>
                ) : (
                  <InpSignupContainer>
                    <InpSignupLabel>{label}</InpSignupLabel>
                    <InpSignupHeadline>{headline}</InpSignupHeadline>
                    <InpCopy>{copy}</InpCopy>
                    <InpSignupCTAContainer>
                      <NewsletterPuffButton
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
    </Query>
  );
};

export default InlineNewsletterPuff;

InlineNewsletterPuff.propTypes = {
  code: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
