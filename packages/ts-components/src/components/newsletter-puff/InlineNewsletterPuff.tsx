import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { GetNewsletter } from '@times-components/provider';
import { subscribeNewsletter as subscribeNewsletterMutation } from '@times-components/provider-queries';
import { Placeholder } from '@times-components/image';
import { capitalise } from '@times-components/utils';

import { Newsletter } from './newsletter/Newsletter';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import { InpContainer } from './styles';

type InlineNewsletterPuffProps = {
  copy: string;
  headline: string;
  section: string;
  code: string;
};

export const InlineNewsletterPuff = ({
  code,
  copy,
  headline,
  section
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
                  <Newsletter
                    intersectObserverRef={intersectObserverRef}
                    section={capitalise(section)}
                    justSubscribed={justSubscribed}
                    headline={headline}
                    updatingSubscription={updatingSubscription}
                    copy={copy}
                    code={code}
                    subscribeNewsletter={subscribeNewsletter}
                  />
                )}
              </TrackingContextProvider>
            )}
          </Mutation>
        );
      }}
    </GetNewsletter>
  );
};
