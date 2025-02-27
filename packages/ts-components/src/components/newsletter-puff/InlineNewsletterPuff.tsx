import React from 'react';
import { Placeholder } from '@times-components/image';
import { capitalise } from '@times-components/utils';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import { Newsletter } from './newsletter/Newsletter';
import { InpContainer } from './styles';

export const InlineNewsletterPuff = ({
  section,
  setUrl
}: {
  section: string;
  setUrl: any;
}) => {
  const { loading, error, data } = useFetch<any>();

  if (error) {
    return null;
  }

  if (loading || !data) {
    return (
      <InpContainer>
        <Placeholder />
      </InpContainer>
    );
  }

  if (data.newsletter.isSubscribed) {
    return null;
  }

  return (
    <TrackingContextProvider
      context={{
        object: 'InlineNewsletterPuff',
        attrs: {
          article_parent_name: data.newsletter.title,
          event_navigation_action: 'navigation'
        }
      }}
      scrolledEvent={{
        object: 'NewsletterPuffButton',
        attrs: {
          event_navigation_name: 'widget : puff : sign up now : displayed',
          event_navigation_browsing_method: 'automated',
          event_navigation_action: 'navigation'
        }
      }}
    >
      {({ intersectObserverRef }) => (
        <Newsletter
          intersectObserverRef={intersectObserverRef}
          section={capitalise(section)}
          code={data.newsletter.id}
          headline={data.newsletter.title}
          copy={data.newsletter.description}
          subscribeNewsletter={setUrl}
        />
      )}
    </TrackingContextProvider>
  );
};
