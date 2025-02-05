import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballFixturesTournament } from './OptaFootballFixturesTournament';

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
      ),
      type: 'decorator',
    },
    {
      component: () => (
        <OptaFootballFixturesTournament
          season="2023"
          competition="3"
          show_title={false}
          full_width
        />
      ),
      name: 'Fixture Tournament',
      type: 'story',
    },
  ],
  name: 'Typescript Component/In Article/Football/Fixtures',
};

// @ts-ignore
showcaseConverter(module, showcase);
