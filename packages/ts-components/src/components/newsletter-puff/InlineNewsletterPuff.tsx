import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { GetNewsletter } from '@times-components/provider';
import { subscribeNewsletter as subscribeNewsletterMutation } from '@times-components/provider-queries';
import { Placeholder } from '@times-components/image';

import {
  NewsletterPuffLinkButton,
  NewsletterPuffButton
} from './NewsletterPuffButton';

import { NewsletterPuffLink } from './NewsletterPuffLink';
import { LoadingOverlay } from './LoadingOverlay';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import {
  InpContainer,
  InpCopy,
  InpPreferencesContainer,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSubscribedContainer
} from './styles';

type InlineNewsletterPuffProps = {
  copy: string;
  headline: string;
  sectionColour?: string;
  label?: string;
  code: string;
};

export const InlineNewsletterPuff = ({
  code,
  copy,
  headline,
  label,
  sectionColour
}: InlineNewsletterPuffProps) => {
  const [justSubscribed, setJustSubscribed] = useState(false);

  const capitiliseUpperCase = (section?: string) => {
    if (!section) {
      return;
    }
    const firstLetter = section.charAt(0);
    const restOfString = section.split(firstLetter);
    return `${firstLetter.toUpperCase()}${restOfString[1]}`;
  };

  const section = capitiliseUpperCase(sectionColour);
  console.log('XXXXXXXXXXXXXXXXXXXXXX');
  console.log('XXXXXXXXXXXXXXXXXXXXXX');
  console.log('XXXXXXXXXXXXXXXXXXXXXX');
  console.log('XXXXXXXXXXXXXXXXXXXXXX', section);

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
              <TrackingContextProvider
                context={{
                  object: 'InlineNewsletterPuff',
                  attrs: {
                    article_parent_name: newsletter.title,
                    event_navigation_action: 'navigation'
                  }
                }}
                scrolledEvent={{
                  object: 'NewsletterPuffButton',
                  attrs: {
                    event_navigation_name:
                      'widget : puff : sign up now : displayed',
                    event_navigation_browsing_method: 'automated',
                    event_navigation_action: 'navigation'
                  }
                }}
              >
                {({ intersectObserverRef }) => (
                  <React.Fragment>
                    <InpContainer sectionColour={section}>
                      {updatingSubscription && <LoadingOverlay />}
                      {!justSubscribed ? (
                        <InpSubscribedContainer>
                          <InpCopy>
                            You've succesfully signed up to{' '}
                            <InpSignupHeadline>{headline}. </InpSignupHeadline>
                            <NewsletterPuffLink />
                          </InpCopy>
                          <InpPreferencesContainer />
                        </InpSubscribedContainer>
                      ) : (
                        <InpSignupContainer>
                          <InpCopy>
                            <InpSignupHeadline>{headline}: </InpSignupHeadline>
                            {copy}<NewsletterPuffButton
                            style='link'
                              updatingSubscription={updatingSubscription}
                              onPress={() => {
                                if (!updatingSubscription) {
                                  subscribeNewsletter({ variables: { code } });
                                }
                              }}
                            />
                          </InpCopy>
                          <InpSignupCTAContainer ref={intersectObserverRef}>
                            <NewsletterPuffButton
                            style='button'
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
                  </React.Fragment>
                )}
              </TrackingContextProvider>
            )}
          </Mutation>
        );
      }}
    </GetNewsletter>
  );
};
