import React from 'react';

import { MockedProvider } from '@times-components/provider-test-tools';
import { showcaseConverter } from '@times-components/storybook';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

import { mockArticles } from './fixtures/articles';
import { mockQueries } from './fixtures/queries';

import { RecommendedArticles } from './RecommendedArticles';

const recarticles = {
  children: [
    {
      component: () => (
        <MockedProvider mocks={mockQueries(mockArticles.slice(0, 1))}>
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
        <MockedProvider mocks={mockQueries(mockArticles.slice(0, 2))}>
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
        <MockedProvider mocks={mockQueries(mockArticles.slice(0, 3))}>
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
