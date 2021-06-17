import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballMatchStats } from './OptaFootballMatchStats';

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
        <OptaFootballMatchStats season="2020" competition="3" match="2041900" />
      ),
      name: 'MatchStats',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballMatchStats season="2020" competition="8" match="2128595" />
      ),
      name: 'MatchStats (results)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/MatchStats'
};

// @ts-ignore
showcaseConverter(module, showcase);
