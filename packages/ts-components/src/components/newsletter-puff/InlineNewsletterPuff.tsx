import React, { useMemo, useState } from 'react';

import { Placeholder } from '@times-components/image';
import { capitalise } from '@times-components/utils';

import { Newsletter } from './newsletter/Newsletter';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import { InpContainer } from './styles';
import { FetchProvider, useFetch } from '../../helpers/fetch/FetchProvider';
import { ContentProvider } from '../save-star/ContentProvider';

type InlineNewsletterPuffProps = {
  copy?: string;
  headline?: string;
  section: string;
  code: string;
  isAutoNewsletterPuff?: boolean;
};

export const InlineNewsletterPuff = ({
  code,
  copy,
  headline,
  section,
  isAutoNewsletterPuff,
}: InlineNewsletterPuffProps) => {
  const [url, setUrl] = useState<string>(
    `/api/is-subscribed-newsletter/${code}`
  );
  const fetchOptions = useMemo(() => ({ credentials: 'same-origin' }), []);

  return (
    <FetchProvider url={url} options={fetchOptions}>
      {() => {
        const { loading, error, data } = useFetch<any>();
        console.log('data', {data,error,loading});
        if (error) {
          return null;
        }

        if (loading || !data.newsletter) {
          return (
            <InpContainer>
              <Placeholder />
            </InpContainer>
          );
        }

        if (data.newsletter.isSubscribed) {
          return null;
        }

        const title = isAutoNewsletterPuff ? data.newsletter.title : headline;
        const description = isAutoNewsletterPuff
          ? data.newsletter.description
          : copy;

        return (
          <TrackingContextProvider
            context={{
              object: 'InlineNewsletterPuff',
              attrs: {
                article_parent_name: data.newsletter.title,
                event_navigation_action: 'navigation',
              },
            }}
            scrolledEvent={{
              object: 'NewsletterPuffButton',
              attrs: {
                event_navigation_name:
                  'widget : puff : sign up now : displayed',
                event_navigation_browsing_method: 'automated',
                event_navigation_action: 'navigation',
              },
            }}
          >
            {({ intersectObserverRef }) => (
              <ContentProvider>
                <Newsletter
                  intersectObserverRef={intersectObserverRef}
                  section={capitalise(section)}
                  headline={title}
                  copy={description}
                  code={code}
                  subscribeNewsletter={setUrl}
                />
              </ContentProvider>
            )}
          </TrackingContextProvider>
        );
      }}
    </FetchProvider>
  );
};
