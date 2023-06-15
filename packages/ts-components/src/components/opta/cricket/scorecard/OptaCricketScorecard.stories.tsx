import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaCricketScorecard } from './OptaCricketScorecard';

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
      ),
      type: 'decorator'
    },
    {
      component: () => (
        <OptaCricketScorecard competition="2722" match="49716" />
      ),
      name: 'Scorecard',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Cricket/Scorecard'
};

// @ts-ignore
showcaseConverter(module, showcase);
