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
          date_from="2021-06-11"
          date_to="2021-06-12"
        />
      ),
      name: 'Fixtures',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballFixtures
          season="2020"
          competition="8"
          date_from="2021-04-03"
          date_to="2021-04-05"
        />
      ),
      name: 'Fixtures (results) ',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/Fixtures'
};

// @ts-ignore
showcaseConverter(module, showcase);
