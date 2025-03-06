import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaRugbyFixtures } from './OptaRugbyFixtures';

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
        <OptaRugbyFixtures
          season="2022"
          competition="209"
          date_from="2022-01-01"
          date_to="2022-12-01"
        />
      ),
      name: 'Fixtures',
      type: 'story'
    },
    {
      component: () => (
        <OptaRugbyFixtures
          season="2022"
          competition="209"
          date_from="2022-01-01"
          date_to="2022-12-01"
        />
      ),
      name: 'Fixtures (results)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Rugby/Fixtures'
};

// @ts-ignore
showcaseConverter(module, showcase);
