import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballSummary } from './OptaFootballSummary';

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
        <OptaFootballSummary season="2020" competition="3" match="2041881" />
      ),
      name: 'Summary',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballSummary season="2020" competition="8" match="2128595" />
      ),
      name: 'Summary (results)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/Summary'
};

// @ts-ignore
showcaseConverter(module, showcase);
