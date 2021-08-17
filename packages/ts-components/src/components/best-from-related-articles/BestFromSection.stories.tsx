import React from 'react';

import { storiesOf } from '@storybook/react';
import { BestOfRelatedArticles } from './BestFromSection';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { newskitRelatedArticleSlice } from './fixtures/newskit-related-articles';

storiesOf('Typescript Component/Article Extras', module).add(
  'Best from Section',
  () => {
  
    return (
      <BestOfRelatedArticles
        analyticsStream={analyticsStream}
        slice={newskitRelatedArticleSlice}
      />
    );
  }
)