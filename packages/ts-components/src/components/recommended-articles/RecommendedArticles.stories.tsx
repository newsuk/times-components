import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { getArticles } from './helpers';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import previewData from '../../fixtures/preview-data/recommended-articles';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

import { RecommendedArticles } from './RecommendedArticles';

const recommArticles = {
  children: [
    {
      component: () => (
        <FetchProvider previewData={getArticles(previewData, 1)}>
          <RecommendedArticles
            heading="Today's news"
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
            heading="Today's business"
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
            heading="Today's sport"
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
