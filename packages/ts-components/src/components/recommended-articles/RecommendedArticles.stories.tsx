import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import previewData from '../../fixtures/preview-data/recommended-articles';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

import { RecommendedArticles } from './RecommendedArticles';

export const getArticles = (data: any, numOfArticles: number) => ({
  recommendations: {
    articles: data.recommendations.articles.slice(0, numOfArticles)
  }
});

const recommArticles = {
  children: [
    {
      component: () => (
        <FetchProvider previewData={getArticles(previewData, 1)}>
          <RecommendedArticles
            section="News"
            isVisible
            analyticsStream={analyticsStream}
          />
        </FetchProvider>
      ),
      name: 'Recommended Articles - 1 Article',
      platform: 'web',
      type: 'story'
    },
    {
      component: () => (
        <FetchProvider previewData={getArticles(previewData, 2)}>
          <RecommendedArticles
            section="Business"
            isVisible
            analyticsStream={analyticsStream}
          />
        </FetchProvider>
      ),
      name: 'Recommended Articles - 2 Article',
      platform: 'web',
      type: 'story'
    },
    {
      component: () => (
        <FetchProvider previewData={previewData}>
          <RecommendedArticles
            section="Sport"
            isVisible
            analyticsStream={analyticsStream}
          />
        </FetchProvider>
      ),
      name: 'Recommended Articles - 3 Article',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Recommended Articles'
};

showcaseConverter(module, recommArticles);
