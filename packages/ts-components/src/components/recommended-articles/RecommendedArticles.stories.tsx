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
              __typename: 'UniversalArticle',
              media: {
                __typename: 'Image',
                crop169: {
                  __typename: 'ImageCrop',
                  url: 'https://www.staging-thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F11bba690-daa6-11ec-8de3-573a6521e09e.jpg?crop=840%2C472%2C389%2C191',
                  alt: null
                },
                crop32: {
                  __typename: 'ImageCrop',
                  url: 'https://www.staging-thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F11bba690-daa6-11ec-8de3-573a6521e09e.jpg?crop=840%2C472%2C389%2C191',
                  alt: null
                }
              },
              id: '5dc6d0c2-daa2-11ec-8de3-573a6521e09e',
              headline: 'Ukraine must seek peace talks to have any hope of revival',
              url: 'https://www.staging-thetimes.co.uk/article/without-peace-talks-ukraine-has-no-future-8tvvvtxft',
              slug: 'without-peace-talks-ukraine-has-no-future'
            },
            {
              __typename: 'UniversalArticle',
              media: {
                __typename: 'Image',
                crop169: {
                  __typename: 'ImageCrop',
                  url: 'https://www.staging-thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F11cea36a-daad-11ec-bcbd-e35b52e0266c.jpg?crop=1500%2C844%2C0%2C78',
                  alt: null
                },
                crop32: {
                  __typename: 'ImageCrop',
                  url: 'https://www.staging-thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F11cea36a-daad-11ec-bcbd-e35b52e0266c.jpg?crop=1500%2C844%2C0%2C78',
                  alt: null
                }
              },
              id: 'e9982934-daac-11ec-bcbd-e35b52e0266c',
              headline: 'Putin’s next move? A truce to split the West',
              url: 'https://www.staging-thetimes.co.uk/article/putins-next-move-a-truce-to-split-the-west-bp6q95w60',
              slug: 'putins-next-move-a-truce-to-split-the-west'
            },
            {
              __typename: 'UniversalArticle',
              media: {
                __typename: 'Image',
                crop169: {
                  __typename: 'ImageCrop',
                  url: 'https://www.staging-thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1f7ce072-dab1-11ec-8de3-573a6521e09e.jpg?crop=6635%2C3732%2C694%2C439',
                  alt: null
                },
                crop32: {
                  __typename: 'ImageCrop',
                  url: 'https://www.staging-thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1f7ce072-dab1-11ec-8de3-573a6521e09e.jpg?crop=6635%2C3732%2C694%2C439',
                  alt: null
                }
              },
              id: 'd0cbd18a-daa7-11ec-8de3-573a6521e09e',
              headline: 'Want a healthier life? Harness your body clock',
              url: 'https://www.staging-thetimes.co.uk/article/want-a-healthier-life-harness-your-body-clock-zqx3qwxpk',
              slug: 'want-a-healthier-life-harness-your-body-clock'
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
