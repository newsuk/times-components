import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballStandings } from './OptaFootballStandings';

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
      ),
      type: 'decorator'
    },
    {
      component: () => <OptaFootballStandings season="2020" competition="8" />,
      name: 'Standings',
      type: 'story'
    },
    {
      component: () => <OptaFootballStandings season="2020" competition="3" />,
      name: 'Standings (inline)',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballStandings
          season="2020"
          competition="3"
          navigation={true}
        />
      ),
      name: 'Standings (dropdown)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/Standings'
};

// @ts-ignore
showcaseConverter(module, showcase);
