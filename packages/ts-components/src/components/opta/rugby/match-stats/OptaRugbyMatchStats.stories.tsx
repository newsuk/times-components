import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaRugbyMatchStats } from './OptaRugbyMatchStats';

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
        <OptaRugbyMatchStats season="2022" competition="209" match="921100" />
      ),
      name: 'MatchStats',
      type: 'story'
    },
    {
      component: () => (
        <OptaRugbyMatchStats season="2022" competition="209" match="921087" />
      ),
      name: 'MatchStats (results)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Rugby/MatchStats'
};

// @ts-ignore
showcaseConverter(module, showcase);
