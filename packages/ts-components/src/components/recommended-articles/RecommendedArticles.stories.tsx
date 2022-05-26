import React from 'react';

import { showcaseConverter } from '@times-components/storybook';
import { MockedProvider } from '@times-components/provider-test-tools';
import { recommendations } from '@times-components/provider-queries';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

import { mockArticles } from './mocks/articles';
import { Article } from './formatters';

import { RecommendedArticles } from './RecommendedArticles';

const getMocks = (articles: Article[]) => [
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
          articles
        }
      }
    }
  }
];

const recarticles = {
  children: [
    {
      component: () => (
        <MockedProvider mocks={getMocks([mockArticles[0]])}>
          <RecommendedArticles
            articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
            section="News"
            isVisible
            analyticsStream={analyticsStream}
          />
        </MockedProvider>
      ),
      name: 'Recommended Articles - 1 Article',
      platform: 'web',
      type: 'story'
    },
    {
      component: () => (
        <MockedProvider mocks={getMocks([mockArticles[0], mockArticles[1]])}>
          <RecommendedArticles
            articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
            section="Business"
            isVisible
            analyticsStream={analyticsStream}
          />
        </MockedProvider>
      ),
      name: 'Recommended Articles - 2 Article',
      platform: 'web',
      type: 'story'
    },
    {
      component: () => (
        <MockedProvider mocks={getMocks(mockArticles)}>
          <RecommendedArticles
            articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
            section="Sport"
            isVisible
            analyticsStream={analyticsStream}
          />
        </MockedProvider>
      ),
      name: 'Recommended Articles - 3 Article',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Recommended Articles'
};

showcaseConverter(module, recarticles);
