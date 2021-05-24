import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { GetNewsletter } from '@times-components/provider';
import { subscribeNewsletter as subscribeNewsletterMutation } from '@times-components/provider-queries';
import Image, { Placeholder } from '@times-components/image';

type PreviewNewsletterPuffProps = {
  copy: string;
  headline: string;
  imageUri: string;
  label: string;
};

type InlineNewsletterPuffProps = {
  analyticsStream: (event: any) => void;
  code: string;
  copy: string;
  headline: string;
  imageUri: string;
  label?: string;
};

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
} from './styles';

import {
  NewsletterPuffButton,
  PreviewNewsletterPuffButton
} from './newsletter-puff-button';
import { NewsletterPuffLink } from './newsletter-puff-link';

function onManagePreferencesPress(): Promise<any> | void {
  // if (Platform.OS !== 'web') {
  //   const url = 'https://home.thetimes.co.uk/myNews';
  //   Linking.canOpenURL(url)
  //     .then(supported => {
  //       if (!supported) {
  //         // tslint:disable-next-line:no-console
  //         return console.error('Cant open url', url); // eslint-disable-line no-console
  //       }
  //       return Linking.openURL(url);
  //     })
  //     // tslint:disable-next-line:no-console
  //     .catch(err => console.error('An error occurred', err)); // eslint-disable-line no-console
  // }
}
export const PreviewNewsletterPuff = ({
  copy,
  headline,
  imageUri,
  label
}: PreviewNewsletterPuffProps) => (
  <InpContainer>
    <InpImageContainer>
      <Image aspectRatio={1.42} uri={imageUri} />
    </InpImageContainer>
    <InpSignupContainer>
      <InpSignupLabel>{label}</InpSignupLabel>
      <InpSignupHeadline>{headline}</InpSignupHeadline>
      <InpCopy>{copy}</InpCopy>
      <InpSignupCTAContainer>
        <PreviewNewsletterPuffButton />
      </InpSignupCTAContainer>
    </InpSignupContainer>
  </InpContainer>
);

export const InlineNewsletterPuff = ({
  analyticsStream,
  code,
  copy,
  headline,
  imageUri,
  label
}: InlineNewsletterPuffProps) => {
  const [justSubscribed, setJustSubscribed] = useState(false);

  return (
    <GetNewsletter code={code} ssr={false} debounceTimeMs={0}>
      {({ isLoading, error, newsletter }: any) => {
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
            onCompleted={({ subscribeNewsletter = {} }: any) => {
              setJustSubscribed(subscribeNewsletter.isSubscribed);
            }}
          >
            {(
              subscribeNewsletter: any,
              { loading: updatingSubscription }: any
            ) => (
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
