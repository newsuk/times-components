import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaRugbySummary } from './OptaRugbySummary';

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
        <OptaRugbySummary season="2022" competition="209" match="921100" />
      ),
      name: 'Summary',
      type: 'story'
    },
    {
      component: () => (
        <OptaRugbySummary season="2022" competition="209" match="921087" />
      ),
      name: 'Summary (results)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Rugby/Summary'
};

// @ts-ignore
showcaseConverter(module, showcase);
