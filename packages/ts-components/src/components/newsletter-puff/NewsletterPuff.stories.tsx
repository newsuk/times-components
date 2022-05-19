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
    delay: 1000,
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
          "articles": [
            {
              "__typename": "UniversalArticle",
              "bylines": [
                {
                  "__typename": "TextByline"
                }
              ],
              "flags": [
                "NEW"
              ],
              "headline": "Whole world is against us, says top Russian strategist",
              "id": "a9ffb7cc-d5d1-11ec-bb99-1bcd45646516",
              "label": "war in ukraine",
              "media": {
                "__typename": "Image"
              },
              "publishedDateTime": "2022-05-17T12:10:00.000Z",
              "publisher": "TIMES",
              "slug": "were-no-match-for-ukrainian-grit-and-firepower-says-retired-russian-colonel",
              "summary": {
                "__typename": "ArticleParagraph",
                "children": [
                  {
                    "__typename": "ArticleText"
                  },
                  {
                    "__typename": "ArticleText"
                  }
                ]
              },
              "template": "mainstandard",
              "updatedDateTime": "2022-05-18T14:02:47.000Z",
              "url": "https://www.staging-thetimes.co.uk/article/were-no-match-for-ukrainian-grit-and-firepower-says-retired-russian-colonel-lhnvsfj33"
            },
            {
              "__typename": "UniversalArticle",
              "bylines": [
                {
                  "__typename": "TextByline"
                }
              ],
              "flags": [],
              "headline": "Vardys leave court with swipe at Wayne Rooney",
              "id": "f3d730a0-d5c2-11ec-8585-951ab3afb4d2",
              "label": "UK NEWS",
              "media": {
                "__typename": "Image"
              },
              "publishedDateTime": "2022-05-17T23:00:00.000Z",
              "publisher": "TIMES",
              "slug": "wayne-rooney-to-give-evidence-in-wagatha-christie-trial-as-jamie-vardy-attends-court-for-first-time",
              "summary": {
                "__typename": "ArticleParagraph",
                "children": [
                  {
                    "__typename": "ArticleText"
                  },
                  {
                    "__typename": "ArticleHyperlink"
                  },
                  {
                    "__typename": "ArticleText"
                  },
                  {
                    "__typename": "ArticleText"
                  }
                ]
              },
              "template": "mainstandard",
              "updatedDateTime": "2022-05-17T23:34:37.000Z",
              "url": "https://www.staging-thetimes.co.uk/article/wayne-rooney-to-give-evidence-in-wagatha-christie-trial-as-jamie-vardy-attends-court-for-first-time-wlzvxklc6"
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
