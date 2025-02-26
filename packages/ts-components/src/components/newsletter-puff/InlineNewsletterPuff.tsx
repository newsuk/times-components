import React, { useMemo, useState } from 'react';

import { GetNewsletter } from '@times-components/provider';
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
};

export const InlineNewsletterPuff = ({
  code,
  section
}: InlineNewsletterPuffProps) => {
  const [url, setUrl] = useState<string>(
    `/api/is-subscribed-newsletter/${code}`
  );
  const fetchOptions = useMemo(() => ({ credentials: 'same-origin' }), []);

  return (
    <GetNewsletter code={code} ssr={false} debounceTimeMs={0}>
      {({ isLoading, error, newsletter }: any) => {
        if (error) {
          return null;
        }

        if (isLoading || !newsletter) {
          return (
            <InpContainer>
              <Placeholder />
            </InpContainer>
          );
        }

        if (newsletter.isSubscribed) {
          return null;
        }

        return (
          <FetchProvider url={url} options={fetchOptions}>
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
                <ContentProvider>
                  <Newsletter
                    intersectObserverRef={intersectObserverRef}
                    section={capitalise(section)}
                    headline={newsletter?.title}
                    copy={newsletter?.description}
                    code={code}
                    subscribeNewsletter={setUrl}
                  />
                </ContentProvider>
              )}
            </TrackingContextProvider>
          </FetchProvider>
        );
      }}
    </GetNewsletter>
  );
};
