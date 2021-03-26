import React, { useState } from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";

import { GetNewsletter } from "@times-components/provider";
import { subscribeNewsletter as subscribeNewsletterMutation } from "@times-components/provider-queries";
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
  InpSubscribedHeadline
} from "../styles/inline-newsletter-puff";

import NewsletterPuffButton from "./newsletter-puff-button";
import NewsletterPuffLink from "./newsletter-puff-link";

const AutoNewsletterPuff = ({
  analyticsStream,
  code,
  copy,
  headline,
  imageUri,
  label
}) => {
  const [justSubscribed, setJustSubscribed] = useState(false);

  // localStorage

  return (
    <GetNewsletter code={code} ssr={false} debounceTimeMs={0}>
      {({ isLoading, error, newsletter }) => {
        if (error) {
          return null;
        }

        if (isLoading || !newsletter) {
          return (
            <InpContainer style={{ height: 257 }}>
              <Placeholder />
            </InpContainer>
          );
        }

        if (newsletter.isSubscribed && !justSubscribed) {
          return null;
        }

        return (
          <Mutation
            mutation={subscribeNewsletterMutation}
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
                      {`You’ve successfully signed up to ${newsletter.title}`}
                    </InpSubscribedHeadline>
                    <InpPreferencesContainer>
                      <NewsletterPuffLink
                        enforceTracking
                        newsletterPuffName={newsletter.title}
                        analyticsStream={analyticsStream}
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
                        enforceTracking
                        newsletterPuffName={newsletter.title}
                        analyticsStream={analyticsStream}
                        updatingSubscription={updatingSubscription}
                        onPress={() => {
                          if (!updatingSubscription) {
                            subscribeNewsletter({ variables: { code } });
                          }
                        }}
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

export default AutoNewsletterPuff;

AutoNewsletterPuff.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
