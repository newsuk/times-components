/*import { showcaseConverter } from '@times-components/storybook';

import React from 'react';
import { MockedProvider } from '@times-components/provider-test-tools';
import { getNewsletter } from '@times-components/provider-queries';

import { AutoNewsletterPuff } from './AutoNewsletterPuff';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { PreviewNewsletterPuff } from './preview-newsletter-puff/PreviewNewsletterPuff';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const mocks = [
  {
    request: {
      query: getNewsletter,
      variables: {
        code: 'TNL-101'
      }
    },
    result: {
      data: {
        newsletter: {
          id: 'a2l6E000000CdHzQAK',
          isSubscribed: false,
          title: 'Daily Briefing',
          __typename: 'Newsletter'
        }
      }
    }
  }
];

const showcase = {
  children: [
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <MockedProvider mocks={mocks}>
          Current Count = {window.sessionStorage.getItem('view-count')}
          <TrackingContextProvider
            analyticsStream={analyticsStream}
            context={{ component: 'ArticleSkeleton' }}
          >
            <AutoNewsletterPuff
              code={text('code', 'TNL-101')}
              headline={text('headline', 'Daily Briefing')}
              copy={text(
                'copy',
                'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
              )}
              section="sport"
            />
          </TrackingContextProvider>
        </MockedProvider>
      ),

      name: 'Auto Newsletter Puff',
      platform: 'web',
      type: 'story'
    },
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <MockedProvider mocks={mocks}>
          <TrackingContextProvider
            analyticsStream={analyticsStream}
            context={{ component: 'ArticleSkeleton' }}
          >
            <InlineNewsletterPuff
              section="news"
              code={text('code', 'TNL-101')}
              headline={text('headline', 'Daily Briefing')}
              copy={text(
                'copy',
                'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
              )}
            />
          </TrackingContextProvider>
        </MockedProvider>
      ),

      name: 'Inline Newsletter Puff',
      platform: 'web',
      type: 'story'
    },
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <PreviewNewsletterPuff
          section="sport"
          headline={text('headline', 'Daily Briefing')}
          copy={text(
            'copy',
            'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
          )}
        />
      ),

      name: 'Preview Newsletter Puff',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Newsletter Puffs'
};

showcaseConverter(module, showcase);
*/
