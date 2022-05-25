import React from 'react';

import { showcaseConverter } from '@times-components/storybook';
import { MockedProvider } from '@times-components/provider-test-tools';
import { recommendations } from '@times-components/provider-queries';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { RecommendedArticles } from './RecommendedArticles';

const mocks = [
  {
    delay: 1000,
    request: {
      query: recommendations,
      variables: {
        publisher: 'TIMES',
        recomArgs: {
          userId: '1234',
          articleId: '94a01926-719a-11ec-aacf-0736e08b15cd'
        }
      }
    },
    result: {
      data: {
        recommendations: {
          __typename: 'Recommendations',
          leadAsset: 'null',
          articles: [
            {
              url:
                'https://www.thetimes.co.uk/article/older-people-need-a-champion-to-take-on-the-digital-world-pbwpmrgxw',
              label: 'Esther Rantzen',
              headline:
                'Older people need a champion to take on the digital world',
              publishedDateTime: '2022-05-24T20:00:00.000Z',
              bylines: [
                {
                  type: 'inline',
                  value: 'Esther Rantzen'
                }
              ],
              summary: {
                children: [
                  {
                    text:
                      'The digital revolution is causing millions of older people distress and anxiety. It’s not that we oldies resist change: many of us do our best to learn and to take on each new challenge, whether it’s'
                  }
                ]
              },
              media: {
                crops: [
                  {
                    url:
                      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F65d8eb4a-db94-11ec-bcbd-e35b52e0266c.jpg?crop=1500%2C844%2C0%2C78',
                    alt: null,
                    aspectRatio: '16:9'
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }
];

const recarticles = {
  children: [
    {
      component: () => (
        <MockedProvider mocks={mocks}>
          <RecommendedArticles
            articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
            section="News"
            analyticsStream={analyticsStream}
          />
        </MockedProvider>
      ),

      name: 'Recommended Articles',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Recommended Articles'
};

showcaseConverter(module, recarticles);
