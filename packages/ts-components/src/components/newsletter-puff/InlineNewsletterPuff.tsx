import React, { useMemo, useState } from 'react';

import { Placeholder } from '@times-components/image';
import { capitalise } from '@times-components/utils';

import { Newsletter } from './newsletter/Newsletter';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import { InpContainer } from './styles';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
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
      {({ loading, error, data }: any) => {
        if (error) return null;
        if (loading || !data) {
          return (
            <InpContainer>
              <Placeholder />
            </InpContainer>
          );
        }
        if (data.isSubscribed) return null;

        const title = isAutoNewsletterPuff ? data.title : headline;
        const description = isAutoNewsletterPuff ? data.description : copy;

        return (
          <TrackingContextProvider
            context={{
              object: 'InlineNewsletterPuff',
              attrs: {
                article_parent_name: data.title,
                event_navigation_action: 'navigation',
              },
            }}
            scrolledEvent={{
              object: 'NewsletterPuffButton',
              attrs: {
                event_navigation_name: data.title,
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