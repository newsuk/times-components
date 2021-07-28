import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballFixtures } from './OptaFootballFixtures';

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
        <OptaFootballFixtures
          season="2020"
          competition="3"
          date_from="2021-06-20"
          date_to="2021-07-11"
        />
      ),
      name: 'Fixtures',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballFixtures
          season="2020"
          competition="3"
          date_from="2021-06-11"
          date_to="2021-07-11"
        />
      ),
      name: 'Fixtures (results)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/Fixtures'
};

// @ts-ignore
showcaseConverter(module, showcase);
