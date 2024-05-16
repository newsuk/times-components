import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballFixturesTicker } from './OptaFootballFixturesTicker';

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
        <OptaFootballFixturesTicker
          season="2023"
          competition="8"
          date_from=""
          date_to=""
        />
      ),
      name: 'Fixtures Ticker',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/Fixtures'
};

// @ts-ignore
showcaseConverter(module, showcase);
