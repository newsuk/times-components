import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballPlayerStats } from './OptaFootballPlayerStats';

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
        <OptaFootballPlayerStats season="2020" competition="3" visible_categories="goals" match="2041900" />
      ),
      name: 'PlayerStats (goals)',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballPlayerStats season="2020" competition="3" visible_categories="assists" match="2041900" />
      ),
      name: 'PlayerStats (assists)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/PlayerStats'
};

// @ts-ignore
showcaseConverter(module, showcase);
