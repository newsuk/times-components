import React, { useState } from 'react';

import { Placeholder } from '@times-components/image';
import { capitalise } from '@times-components/utils';

import { FetchProvider, useFetch } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import { Newsletter } from './newsletter/Newsletter';
import { InpContainer } from './styles';

export const FetchContext = ({
  code,
  copy,
  headline,
  section,
  setUrl
}: {
  code: string;
  copy?: string;
  headline?: string;
  section: string;
  setUrl: any;
}) => {
  const { loading, error, data } = useFetch<{
    newsletter?: {
      id: string;
      title: string;
      description: string;
      isSubscribed: boolean;
    };
    subscribeNewsletter?: {
      id: string;
      isSubscribed: boolean;
    };
  }>();

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

  if (data.newsletter && data.newsletter.isSubscribed) {
    return null;
  }

  const title = headline || (data.newsletter && data.newsletter.title);
  const description = copy || (data.newsletter && data.newsletter.description);

  return (
    <TrackingContextProvider
      context={{
        object: 'InlineNewsletterPuff',
        attrs: {
          article_parent_name: title,
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
          code={code}
          headline={title}
          copy={description}
          section={capitalise(section)}
          subscribeNewsletter={setUrl}
        />
      )}
    </TrackingContextProvider>
  );
};

export const InlineNewsletterPuff = ({
  code,
  copy,
  headline,
  section
}: {
  code: string;
  copy?: string;
  headline?: string;
  section: string;
}) => {
  const [url, setUrl] = useState<string>(
    `/api/is-subscribed-newsletter/${code}`
  );

  return (
    <FetchProvider url={url} options={{ credentials: 'same-origin' }}>
      <FetchContext
        code={code}
        copy={copy}
        headline={headline}
        section={section}
        setUrl={setUrl}
      />
    </FetchProvider>
  );
};
