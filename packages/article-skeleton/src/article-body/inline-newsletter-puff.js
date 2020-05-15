import React, { useState } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import Image, { Placeholder } from "@times-components/image";
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
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel,
  InpSubscribedCopy,
  InpSubscribedHeadline,
  InpSubscribedContainer,
  buttonStyles,
  textStyle
} from "../styles/inline-newsletter-puff";

function onManagePreferencesPress() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews");
  }
}

export const GET_NEWSLETTER = gql`
  query GetNewsletter($id: String!) {
    newsletter(id: $id) {
      id
      isSubscribed
    }
  }
`;

export const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($id: String!) {
    subscribeNewsletter(id: $id) {
      id
      isSubscribed
    }
  }
`;

export const InlineNewsletterPuff = ({
  copy,
  headline,
  imageUri,
  label,
  newsletterId: id
}) => {
  const [justSubscribed, setJustSubscribed] = useState(false);

  return (
    <Query query={GET_NEWSLETTER} variables={{ id }} ssr={false}>
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
                        <InpPreferencesText>
                          Manage preferences here
                          <InpIconContainer>
                            <IconForwardArrow
                              fillColour={colours.functional.action}
                            />
                          </InpIconContainer>
                        </InpPreferencesText>
                      </Link>
                    </InpPreferencesContainer>
                  </InpSubscribedContainer>
                ) : (
                  <InpSignupContainer>
                    <InpSignupLabel>{label}</InpSignupLabel>
                    <InpSignupHeadline>{headline}</InpSignupHeadline>
                    <InpCopy>{copy}</InpCopy>
                    <InpSignupCTAContainer>
                      <Button
                        title={
                          updatingSubscription
                            ? "Saving…"
                            : "Sign up to newsletter"
                        }
                        onPress={() => {
                          if (!updatingSubscription) {
                            subscribeNewsletter({ variables: { id } });
                          }
                        }}
                        style={buttonStyles}
                        underlayColor="transparent"
                        textStyle={textStyle}
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

InlineNewsletterPuff.propTypes = {
  label: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  newsletterId: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired
};
