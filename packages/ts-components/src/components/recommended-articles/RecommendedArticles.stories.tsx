import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import previewData from '../../fixtures/preview-data/recommended-articles';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

import { RecommendedArticles } from './RecommendedArticles';

const recommArticles = {
  children: [
    {
      component: () => (
        <FetchProvider previewData={previewData}>
          <RecommendedArticles
            section="News"
            analyticsStream={analyticsStream}
          />
        </FetchProvider>
      ),

      name: 'Recommended Articles',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Recommended Articles'
};

showcaseConverter(module, recommArticles);
