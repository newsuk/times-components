import { showcaseConverter } from '@times-components/storybook';

import React from 'react';
import { MockedProvider } from '@times-components/provider-test-tools';
import {
  getNewsletter,
  subscribeNewsletter,
  recommendations
} from '@times-components/provider-queries';

import { AutoNewsletterPuff } from './AutoNewsletterPuff';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';
import { RecommendedArticles } from './RecommendedArticles';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { PreviewNewsletterPuff } from './PreviewNewsletterPuff';

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
          title: 'Best of Times',
          __typename: 'Newsletter'
        }
      }
    }
  },
  {
    delay: 1000,
    request: {
      query: subscribeNewsletter,
      variables: {
        code: 'TNL-101'
      }
    },
    result: {
      data: {
        subscribeNewsletter: {
          id: 'a2l6E000000CdHzQAK',
          isSubscribed: true,
          __typename: 'Newsletter'
        }
      }
    }
  },
  {
    request: {
      query: recommendations,
      variables: {
        "publisher": "TIMES",
        "recomArgs": {
          "userId": "1234",
          "articleId": "94a01926-719a-11ec-aacf-0736e08b15cd"
        }
      }
    },
    result: {
      data: {
        recommendations: {
          "__typename": "Recommendations",
          "feedbackId": "recommendations",
          "articles": [
            {
              "__typename": "UniversalArticle",
              "id": "a9ffb7cc-d5d1-11ec-bb99-1bcd45646516",
              "headline": "Whole world is against us, says top Russian strategist",
              "label": "war in ukraine",
              "publishedDateTime": "2022-05-17T12:10:00.000Z",
              "updatedDateTime": "2022-05-18T14:02:47.000Z",
              "url": "https://www.staging-thetimes.co.uk/article/were-no-match-for-ukrainian-grit-and-firepower-says-retired-russian-colonel-lhnvsfj33"
            }
          ]
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
              headline={text('headline', 'Best of Times')}
              copy={text(
                'copy',
                'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
              )}
              imageUri={text(
                'imageUri',
                'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800'
              )}
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
              code={text('code', 'TNL-101')}
              headline={text('headline', 'Best of Times')}
              copy={text(
                'copy',
                'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
              )}
              imageUri={text(
                'imageUri',
                'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800'
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
      component: () => (
        <MockedProvider mocks={mocks}>
          <TrackingContextProvider
            analyticsStream={analyticsStream}
            context={{ component: 'ArticleSkeleton' }}
          >
            <RecommendedArticles
              recomArgs={{
                userId: '1234',
                articleId: '94a01926-719a-11ec-aacf-0736e08b15cd'
              }}
            />
          </TrackingContextProvider>
        </MockedProvider>
      ),

      name: 'Recommended Articles',
      platform: 'web',
      type: 'story'
    },
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <PreviewNewsletterPuff
          headline={text('headline', 'Best of Times')}
          copy={text(
            'copy',
            'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
          )}
          imageUri={text(
            'imageUri',
            'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800'
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
