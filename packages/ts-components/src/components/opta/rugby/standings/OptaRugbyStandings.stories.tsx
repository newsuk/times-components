import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaRugbyStandings } from './OptaRugbyStandings';

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
      ),
      type: 'decorator'
    },
    {
      component: () => <OptaRugbyStandings season="2022" competition="209" />,
      name: 'Standings',
      type: 'story'
    },
    {
      component: () => <OptaRugbyStandings season="2022" competition="242" />,
      name: 'Standings (inline)',
      type: 'story'
    },
    {
      component: () => (
        <OptaRugbyStandings season="2022" competition="242" navigation />
      ),
      name: 'Standings (dropdown)',
      type: 'story'
    },
    {
      component: () => (
        <OptaRugbyStandings
          season="2022"
          competition="242"
          default_nav="2"
          navigation
        />
      ),
      name: 'Standings (default)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Rugby/Standings'
};

// @ts-ignore
showcaseConverter(module, showcase);
